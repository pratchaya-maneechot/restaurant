// grpcUtils.ts

import { CallOptions, ClientUnaryCall, Metadata, ServiceError } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

/**
 * Type definition for a standard gRPC callback function
 */
type GrpcCallback<T> = (error: ServiceError | null, response: T | null) => void;

/**
 * Type definition for a gRPC service method with all possible parameter combinations
 */
type GrpcMethod<TRequest, TResponse> = (
  request: TRequest,
  metadataOrCallback?: Metadata | GrpcCallback<TResponse>,
  optionsOrCallback?: CallOptions | GrpcCallback<TResponse>,
  callback?: GrpcCallback<TResponse>,
) => ClientUnaryCall;

/**
 * Promisifies a gRPC service method call with optional metadata and options
 */
export function promisifyGrpc<TRequest, TResponse>(
  method: GrpcMethod<TRequest, TResponse>,
  request: TRequest,
  metadata?: Metadata,
  options?: CallOptions,
): Promise<TResponse> {
  return new Promise<TResponse>((resolve, reject) => {
    const callback: GrpcCallback<TResponse> = (error, response) => {
      if (error) {
        reject(error);
      } else if (response) {
        resolve(response);
      } else {
        const err = new Error('Empty response received from gRPC service') as ServiceError;
        err.code = Status.INTERNAL;
        err.details = 'The service returned a null or undefined response';
        reject(err);
      }
    };

    if (metadata && options) {
      method(request, metadata, options, callback);
    } else if (metadata) {
      method(request, metadata, callback);
    } else {
      method(request, callback);
    }
  });
}

/**
 * Creates a promisified version of a gRPC service with proper typing
 */
export function promisifyGrpcService<TService extends Record<string, any>>(
  service: TService,
  baseMetadata = new Metadata(),
): {
  [K in keyof TService]: TService[K] extends GrpcMethod<infer TRequest, infer TResponse>
    ? (request: TRequest, metadata?: Metadata, options?: CallOptions) => Promise<TResponse>
    : TService[K];
} {
  const promisified: Record<string, any> = {};

  for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(service))) {
    const prop = service[key as keyof TService];

    if (typeof prop === 'function' && key !== 'constructor') {
      promisified[key] = (request: any, metadata?: Metadata, options?: CallOptions) => {
        if (metadata) {
          baseMetadata.merge(metadata);
        }
        return promisifyGrpc(prop.bind(service), request, baseMetadata, options);
      };
    } else {
      promisified[key] = prop;
    }
  }

  return promisified as any;
}
