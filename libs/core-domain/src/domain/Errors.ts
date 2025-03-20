import code from 'http-status-codes';

export class ApplicationError extends Error {
  readonly httpCode: number;
  readonly statusCode: string;
  constructor(httpCode: number, statusCode: string, message: string) {
    super(message);
    this.httpCode = httpCode;
    this.statusCode = statusCode;
  }
}

export class BadRequestException extends ApplicationError {
  public readonly message: string;
  constructor(message?: string) {
    super(code.NOT_FOUND, '400', message || 'Request incorrected');
  }
}

export class NotFoundException extends ApplicationError {
  public readonly message: string;
  constructor(message?: string) {
    super(code.NOT_FOUND, '404', message || 'Entity not found');
  }
}

export class ForbiddenException extends ApplicationError {
  public readonly message: string;
  constructor(message?: string) {
    super(code.FORBIDDEN, '403', message || 'Permission not alow');
  }
}

export class ConflictException extends ApplicationError {
  public readonly message: string;
  constructor(message?: string) {
    super(code.CONFLICT, '409', message || 'Data conflict detected');
  }
}

export class ConcurrencyException extends ApplicationError {
  public readonly message: string;
  constructor(message?: string) {
    super(code.CONFLICT, '409', message || 'Concurrency detected');
  }
}

export class DomainException extends ApplicationError {
  public readonly message: string;
  constructor(message?: string) {
    super(code.BAD_REQUEST, '5310', message || 'Domain exception detected');
  }
}
