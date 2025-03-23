import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from '@apollo/server';
import pino, { Logger } from 'pino';

interface RequestTimings {
  requestStart: number;
  parsingStart?: number;
  validationStart?: number;
  executionStart?: number;
  requestEnd?: number;
  resolverTimings: Record<string, number>;
}

interface LoggerOptions {
  logSlowResolversThreshold?: number;
}

export function ApolloLoggerPlugin<T extends Record<string, any>>(options?: LoggerOptions): ApolloServerPlugin<T> {
  const { logSlowResolversThreshold = 1000 } = options || {};

  const plugin: ApolloServerPlugin<T> = {
    async requestDidStart(initialContext: GraphQLRequestContext<T>): Promise<GraphQLRequestListener<T>> {
      const { request, contextValue } = initialContext;
      const timings: RequestTimings = {
        requestStart: performance.now(),
        resolverTimings: {},
      };
      const _logger = contextValue['logger'] as Logger;

      _logger.info(
        {
          operation: request.operationName,
          variables: request.variables,
          headers: request.http?.headers,
          context: {
            identity: contextValue['identity'],
            userAgent: request.http?.headers?.get('user-agent'),
            clientName: request.http?.headers?.get('apollo-client-name'),
            clientVersion: request.http?.headers?.get('apollo-client-version'),
            ip: request.http?.headers?.get('x-forwarded-for') || request.http?.headers?.get('x-real-ip'),
          },
        },
        `Starting ${request.operationName || 'Unnamed'}`,
      );

      return {
        async parsingDidStart() {
          timings.parsingStart = performance.now();
          return async (err) => {
            const duration = err ? undefined : performance.now() - (timings.parsingStart || 0);
            if (err) {
              _logger.warn({ err }, 'Query parsing failed');
            } else {
              _logger.debug({ duration: `${duration?.toFixed(2)}ms` }, 'Query parsing completed');
            }
          };
        },

        async validationDidStart() {
          timings.validationStart = performance.now();
          return async (err) => {
            const duration = err ? undefined : performance.now() - (timings.validationStart || 0);
            if (err) {
              _logger.warn({ err }, 'Query validation failed');
            } else {
              _logger.debug({ duration: `${duration?.toFixed(2)}ms` }, 'Query validation completed');
            }
          };
        },

        async executionDidStart() {
          timings.executionStart = performance.now();
          return {
            willResolveField({ info, args }) {
              const start = performance.now();
              const fieldKey = `${info.parentType.name}.${info.fieldName}`;

              return (error) => {
                const duration = performance.now() - start;
                timings.resolverTimings[fieldKey] = (timings.resolverTimings[fieldKey] || 0) + duration;

                const logLevel = duration > logSlowResolversThreshold ? 'warn' : 'debug';
                _logger[logLevel](
                  {
                    fieldName: info.fieldName,
                    parentType: info.parentType.name,
                    args: args,
                    duration: `${duration.toFixed(2)}ms`,
                    ...(error && { error: pino.stdSerializers.err(error) }),
                  },
                  'Field resolution completed',
                );
              };
            },
          };
        },

        async willSendResponse(context) {
          timings.requestEnd = performance.now();
          const totalDuration = timings.requestEnd - timings.requestStart;
          const executionDuration = timings.executionStart ? timings.requestEnd - timings.executionStart : undefined;

          _logger.info(
            {
              operation: request.operationName,
              status: context.response.http?.status,
              timings: {
                total: `${totalDuration.toFixed(2)}ms`,
                parsing:
                  timings.parsingStart && timings.validationStart
                    ? `${(timings.validationStart - timings.parsingStart).toFixed(2)}ms`
                    : undefined,
                validation:
                  timings.validationStart && timings.executionStart
                    ? `${(timings.executionStart - timings.validationStart).toFixed(2)}ms`
                    : undefined,
                execution: executionDuration ? `${executionDuration.toFixed(2)}ms` : 'N/A',
                resolvers: Object.fromEntries(
                  Object.entries(timings.resolverTimings).map(([key, value]) => [key, `${value.toFixed(2)}ms`]),
                ),
              },
              size: context.response.body ? JSON.stringify(context.response.body).length : undefined,
            },
            `Completed ${request.operationName || 'Unnamed'}`,
          );
        },

        async didEncounterErrors(context) {
          _logger.error(
            {
              operation: context.operation?.name?.value,
              errors: context.errors.map((error) => pino.stdSerializers.err(error)),
              variables: request.variables,
            },
            `Failed ${request.operationName || 'Unnamed'}`,
          );
        },
      };
    },
  };

  return plugin;
}
