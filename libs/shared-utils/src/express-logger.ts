import { Metadata } from '@grpc/grpc-js';
import { NextFunction, Request, Response } from 'express';
import { Logger } from 'pino';
import { v4 } from 'uuid';
import { logger } from './logger';

export interface IExpressRequest extends Request {
  logger?: Logger;
  metadata?: Metadata;
}

interface ExpressLoggerOptions {
  logSlowRequestsThreshold?: number;
}

export function expressLogger(options: ExpressLoggerOptions = {}) {
  const { logSlowRequestsThreshold = 1000 } = options;

  return (req: IExpressRequest, res: Response, next: NextFunction) => {
    const requestStart = performance.now();
    const requestId = v4();
    const metadata = new Metadata();
    metadata.add('X-Request-ID', requestId);
    const childLogger = logger.child({ requestId });
    const requestMsg = `${req.method} ${req.url}`;

    req.logger = childLogger;
    req.metadata = metadata;

    childLogger.info(
      {
        method: req.method,
        url: req.url,
        headers: req.headers,
        ip: req.ip || req.headers['x-forwarded-for'] || req.headers['x-real-ip'],
        query: req.query,
      },
      `Request started: ${requestMsg}`,
    );

    res.on('finish', () => {
      const requestEnd = performance.now();
      const duration = requestEnd - requestStart;
      const logLevel = duration > logSlowRequestsThreshold ? 'warn' : 'info';

      childLogger[logLevel](
        {
          method: req.method,
          url: req.url,
          status: res.statusCode,
          duration: `${duration.toFixed(2)}ms`,
          size: res.get('Content-Length') || undefined,
        },
        `Request completed: ${requestMsg}`,
      );
    });

    next();
  };
}
