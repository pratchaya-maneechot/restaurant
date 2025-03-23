import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener, HeaderMap } from '@apollo/server';
import pino, { Level } from 'pino';
import { v4 } from 'uuid';
import { logger } from './logger';

interface RequestTimings {
  requestStart: number;
  parsingStart?: number;
  validationStart?: number;
  executionStart?: number;
  requestEnd?: number;
  resolverTimings: Record<string, number>;
}

interface LoggerOptions {
  service: string;
  logSlowResolversThreshold?: number;
  logLevel?: Level;
}

export function ApolloLoggerPlugin<T extends Record<string, any>>(options: LoggerOptions): ApolloServerPlugin<T> {
  const {
    service,
    logSlowResolversThreshold = 1000,
    logLevel = 'info', // Default log level
  } = options;

  // Get the base logger and set its level
  const baseLogger = logger.getLogger();
  baseLogger.level = logLevel;

  const requestLogger = baseLogger.child({
    component: 'apollo-server',
    service,
  });

  const plugin: ApolloServerPlugin<T> = {
    async requestDidStart(initialContext: GraphQLRequestContext<T>): Promise<GraphQLRequestListener<T>> {
      const { request, contextValue } = initialContext;
      const timings: RequestTimings = {
        requestStart: performance.now(),
        resolverTimings: {},
      };

      const requestId = v4();
      const childLogger = requestLogger.child({ requestId });

      childLogger.info(
        {
          requestId,
          operation: request.operationName,
          variables: sanitizeVariables(request.variables),
          headers: sanitizeHeaders(request.http?.headers),
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
              childLogger.warn({ err }, 'Query parsing failed');
            } else {
              childLogger.debug({ duration: `${duration?.toFixed(2)}ms` }, 'Query parsing completed');
            }
          };
        },

        async validationDidStart() {
          timings.validationStart = performance.now();
          return async (err) => {
            const duration = err ? undefined : performance.now() - (timings.validationStart || 0);
            if (err) {
              childLogger.warn({ err }, 'Query validation failed');
            } else {
              childLogger.debug({ duration: `${duration?.toFixed(2)}ms` }, 'Query validation completed');
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
                childLogger[logLevel](
                  {
                    fieldName: info.fieldName,
                    parentType: info.parentType.name,
                    args: sanitizeVariables(args),
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
          const executionDuration = timings.requestEnd - (timings.executionStart || timings.requestStart);

          childLogger.info(
            {
              requestId,
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
                execution: `${executionDuration.toFixed(2)}ms`,
                resolvers: Object.fromEntries(
                  Object.entries(timings.resolverTimings).map(([key, value]) => [key, `${value.toFixed(2)}ms`]),
                ),
              },
              responseSize: context.response.body ? JSON.stringify(context.response.body).length : undefined,
            },
            `Completed ${request.operationName || 'Unnamed'}`,
          );
        },

        async didEncounterErrors(context) {
          childLogger.error(
            {
              requestId,
              operation: context.operation?.name?.value,
              errors: context.errors.map((error) => ({
                message: error.message,
                path: error.path,
                locations: error.locations,
                extensions: error.extensions,
                stack: process.env['NODE_ENV'] === 'development' ? error.stack : undefined,
              })),
              variables: sanitizeVariables(request.variables),
              query: redactQuery(request.query),
            },
            `Failed ${request.operationName || 'Unnamed'}`,
          );
        },
      };
    },
  };

  return plugin;
}

function sanitizeHeaders(headers: HeaderMap | undefined): Record<string, string> {
  if (!headers) return {};

  const sensitiveKeys = ['authorization', 'cookie', 'x-api-key', 'secret', 'token'];
  const sanitized: Record<string, string> = {};

  headers.forEach((value, key) => {
    const lowercaseKey = key.toLowerCase();
    sanitized[key] = sensitiveKeys.some((sensitive) => lowercaseKey.includes(sensitive)) ? '[REDACTED]' : value;
  });
  return sanitized;
}

function redactQuery(query: string | undefined): string | undefined {
  if (!query) return undefined;
  return query.replace(/(password|token|secret|key)[^\n]*$/gim, '$1: [REDACTED]');
}

function sanitizeVariables(variables: any): any {
  if (!variables) return undefined;

  const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth'];
  const sanitize = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) return obj;

    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
          return [key, '[REDACTED]'];
        }
        return [key, typeof value === 'object' ? sanitize(value) : value];
      }),
    );
  };

  return sanitize(variables);
}
