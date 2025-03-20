import {
  handleUnaryCall,
  Metadata,
  sendUnaryData,
  ServerErrorResponse,
  ServerUnaryCall,
  status,
  StatusObject,
} from '@grpc/grpc-js';
import { v4 as uuid4 } from 'uuid';
import { z, ZodSchema } from 'zod';
import { logger } from './logger';

/**
 * Metadata for logging gRPC requests
 * @interface LoggingMetadata
 */
interface LoggingMetadata {
  /** Unique identifier for the request */
  requestId: string;
  /** Name of the gRPC method being called */
  methodName: string;
  /** Timestamp when the request started (in milliseconds) */
  startTime: number;
}

/**
 * Configuration options for the gRPC interceptor
 * @interface InterceptorOptions
 */
interface InterceptorOptions {
  /** Logger instance to use for logging */
  logger: typeof logger;
  /** Optional function to generate request IDs (defaults to UUID v4) */
  generateId?: () => string;
  /** Logging level to use (defaults to 'info') */
  logLevel?: 'info' | 'debug' | 'warn';
}

/**
 * Formats an error object for consistent logging
 * @param {Partial<StatusObject> | ServerErrorResponse | null} error - The error to format
 * @returns {Record<string, unknown>} Formatted error details
 */
const formatError = (error: Partial<StatusObject> | ServerErrorResponse | null): Record<string, unknown> => {
  if (!error) return {};
  return {
    message: (error as ServerErrorResponse).message,
    stack: (error as ServerErrorResponse).stack,
    code: error.code,
    metadata: error.metadata?.toJSON(),
    details: error.details,
  };
};
/**
 * Builder class for creating gRPC interceptors with Zod schema-based typing
 */
export class GrpcInterceptorBuilder<TInput extends ZodSchema, TOutput extends ZodSchema> {
  private inputSchema?: TInput;
  private outputSchema?: TOutput;
  private options: InterceptorOptions;

  constructor(options?: InterceptorOptions) {
    this.options = {
      logger,
      generateId: uuid4,
      logLevel: 'info',
      ...options,
    };
  }

  /**
   * Sets the input validation schema
   * @param schema Zod schema for input validation
   */
  input<T>(schema: ZodSchema<T>): GrpcInterceptorBuilder<ZodSchema<T>, TOutput> {
    // We need to cast here because TypeScript can't track the type change perfectly
    (this as any).inputSchema = schema;
    return this as unknown as GrpcInterceptorBuilder<ZodSchema<T>, TOutput>;
  }

  /**
   * Sets the output validation schema
   * @param schema Zod schema for output validation
   */
  output<U>(schema: ZodSchema<U>): GrpcInterceptorBuilder<TInput, ZodSchema<U>> {
    // Similar cast needed for output schema
    (this as any).outputSchema = schema;
    return this as unknown as GrpcInterceptorBuilder<TInput, ZodSchema<U>>;
  }

  /**
   * Sets the handler method with type inference from schemas
   * @param method The gRPC method implementation
   */
  handler(
    method: (caller: ServerUnaryCall<z.infer<TInput>, z.infer<TOutput>>) => Promise<z.infer<TOutput>>,
  ): handleUnaryCall<z.infer<TInput>, z.infer<TOutput>> {
    const inputSchema = this.inputSchema;
    const outputSchema = this.outputSchema;
    const options = this.options;

    if (!inputSchema || !outputSchema) {
      throw new Error(`gRPC interceptor input and output schema are required!`);
    }

    return async (
      caller: ServerUnaryCall<z.infer<TInput>, z.infer<TOutput>>,
      callback: sendUnaryData<z.infer<TOutput>>,
    ) => {
      const metadata: LoggingMetadata = {
        requestId: options.generateId?.() ?? uuid4(),
        methodName: caller.getPath(),
        startTime: Date.now(),
      };

      const childLogger = options.logger.createChild({
        requestId: metadata.requestId,
        methodName: metadata.methodName,
      });

      try {
        childLogger[options.logLevel ?? 'info']({ request: caller.request }, `Starting ${metadata.methodName}`);

        if (inputSchema) {
          const parseResult = inputSchema.safeParse(caller.request);
          if (!parseResult.success) {
            const error: ServerErrorResponse = {
              code: status.INVALID_ARGUMENT,
              message: 'Invalid request input',
              details: parseResult.error.message,
              metadata: new Metadata(),
              name: 'INVALID_ARGUMENT',
            };
            throw error;
          }
          caller.request = parseResult.data;
        }

        const response = await method(caller);

        if (outputSchema) {
          const parseResult = outputSchema.safeParse(response);
          if (!parseResult.success) {
            const error: ServerErrorResponse = {
              code: status.INTERNAL,
              message: 'Invalid response output',
              details: parseResult.error.message,
              metadata: new Metadata(),
              name: 'INTERNAL',
            };
            throw error;
          }
        }

        const duration = Date.now() - metadata.startTime;
        childLogger[options.logLevel ?? 'info']({ duration, response }, `Completed ${metadata.methodName}`);

        callback(null, response);
      } catch (error) {
        const duration = Date.now() - metadata.startTime;
        childLogger.error(
          { error: formatError(error as StatusObject | Error), duration },
          `Failed ${metadata.methodName}`,
        );

        callback(
          (error as StatusObject) || {
            code: status.INTERNAL,
            message: 'Unknown error',
            details: error instanceof Error ? error.message : String(error),
            metadata: new Metadata(),
            name: 'INTERNAL',
          },
          null,
        );
      }
    };
  }
}
