// grpcUtils.ts
import { ServiceError } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

/**
 * Type definition for a standard gRPC callback function
 */
type GrpcCallback<T> = (error: ServiceError | null, response: T | null) => void;

/**
 * Type definition for a gRPC service method
 */
type GrpcMethod<TRequest, TResponse> = (request: TRequest, callback: GrpcCallback<TResponse>) => any;

/**
 * Promisifies a gRPC service method call
 *
 * @param method - The gRPC service method to call
 * @param request - The request payload
 * @returns A promise that resolves with the response or rejects with an error
 */
export function promisifyGrpc<TRequest, TResponse>(
  method: GrpcMethod<TRequest, TResponse>,
  request: TRequest,
): Promise<TResponse> {
  return new Promise<TResponse>((resolve, reject) => {
    method(request, (error, response) => {
      if (error) {
        reject(error);
      } else if (response) {
        resolve(response);
      } else {
        // Create a standard gRPC error with INTERNAL status
        const err = new Error('Empty response received from gRPC service') as ServiceError;
        err.code = Status.INTERNAL;
        err.details = 'The service returned a null or undefined response';
        reject(err);
      }
    });
  });
}

/**
 * Creates a promisified version of a gRPC service
 *
 * @param service - The gRPC service to promisify
 * @returns An object with the same methods but returning promises
 */
export function promisifyGrpcService<T extends Record<string, any>>(
  service: T,
): {
  [K in keyof T]: T[K] extends GrpcMethod<infer TRequest, infer TResponse>
    ? (request: TRequest) => Promise<TResponse>
    : T[K];
} {
  const promisified: Record<string, any> = {};

  for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(service))) {
    const prop = service[key as keyof T];

    if (typeof prop === 'function' && key !== 'constructor') {
      promisified[key] = (request: any) => promisifyGrpc(prop.bind(service), request);
    } else {
      promisified[key] = prop;
    }
  }

  return promisified as any;
}
