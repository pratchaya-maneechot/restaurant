import type { NextFunction, Request, Response } from 'express';
import { Logger } from 'pino';
import { v4 } from 'uuid';
import { logger } from './logger';

interface RequestWithLogger extends Request {
  logger?: Logger;
}

export const expressLoggerMiddleware = (req: RequestWithLogger, res: Response, next: () => NextFunction) => {
  const childLogger = logger.createChild({
    requestId: v4(),
  });

  req.logger = childLogger;

  const startTime = Date.now();
  res.on('finish', () => {
    childLogger.info(
      {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime: `${Date.now() - startTime}ms`,
      },
      'Request completed',
    );
  });

  next();
};

export const expressErrorLoggerMiddleware = (err: any, req: RequestWithLogger, res: Response) => {
  const loggerToUse = req.logger || logger.getLogger();
  loggerToUse.error(
    {
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
      request: {
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        body: req.body,
      },
      context: {
        path: req.path,
        ip: req.ip,
        timestamp: new Date().toISOString(),
      },
    },
    'Error occurred in request processing',
  );

  return res.status(err.httpCode || 500).json({
    status: err.statusCode || '500',
    message: err.message,
  });
};
