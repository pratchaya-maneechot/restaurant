import { Metadata, ServerErrorResponse, status, StatusObject } from '@grpc/grpc-js';

/**
 * Custom gRPC error class for creating type-safe error objects
 */
export class GrpcError implements StatusObject {
  public code: status;
  public message: string;
  public details: string;
  public metadata: Metadata;
  public name: string;

  constructor(code: status, message: string, details: string) {
    this.code = code;
    this.message = message;
    this.details = details;
    this.metadata = new Metadata();
    this.name = status[code] || 'UNKNOWN_ERROR';
  }

  /**
   * Adds custom metadata to the error
   * @param key Metadata key
   * @param value Metadata value
   * @returns GrpcError for chaining
   */
  withMetadata(key: string, value: string | Buffer | number | boolean | object): this {
    if (typeof value === 'object') {
      this.metadata.set(key, JSON.stringify(value));
    } else {
      this.metadata.set(key, String(value));
    }
    return this;
  }

  /**
   * Converts the error to a StatusObject
   * @returns StatusObject for gRPC compatibility
   */
  toStatusObject(): Partial<StatusObject> | ServerErrorResponse {
    return {
      code: this.code,
      details: this.details,
      metadata: this.metadata,
      message: this.message,
      name: this.name,
    };
  }
}
