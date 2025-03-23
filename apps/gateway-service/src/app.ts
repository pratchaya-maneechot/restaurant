import { expressMiddleware } from '@apollo/server/express4';
import { expressLogger, logger } from '@restaurant/shared-utils';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import http from 'http';
import {
  CORS_HEADERS,
  CORS_METHODS,
  DEFAULT_PORT,
  GRAPHQL_PATH,
  HEALTH_PATH,
  JSON_LIMIT,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from './config/const';
import { graphqlServer } from './graphql';
import { createContext } from './graphql/context';

// Interface for better type safety
interface ServerConfig {
  port: number;
  corsOrigins: string[] | undefined;
  isProduction: boolean;
}

/**
 * Creates and starts the Express server with Apollo integration.
 */
async function startServer(config: ServerConfig): Promise<http.Server> {
  const { port, corsOrigins, isProduction } = config;
  const app: Express = express();
  const httpServer = http.createServer(app);

  // Middleware setup
  app.use(
    cors({
      origin: corsOrigins,
      methods: CORS_METHODS,
      allowedHeaders: CORS_HEADERS,
    }),
  );

  app.use(express.json({ limit: JSON_LIMIT }));

  if (isProduction) {
    app.set('trust proxy', 1);
    app.use(
      rateLimit({
        windowMs: RATE_LIMIT_WINDOW_MS,
        max: RATE_LIMIT_MAX,
        message: { error: 'Too many requests, please try again later.' },
      }),
    );
  }

  // Health check endpoint
  app.get(HEALTH_PATH, (_req: Request, res: Response) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
  });
  app.use(expressLogger());
  // Apollo Server integration
  const apolloServer = await graphqlServer(httpServer);
  app.use(
    GRAPHQL_PATH,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => createContext(req),
    }),
  );

  // Start the server
  return new Promise((resolve) => {
    httpServer.listen({ port }, () => {
      logger.info(`🚀 Server ready at http://localhost:${port}${GRAPHQL_PATH}`, { HELLO: 'SSSS' });
      resolve(httpServer);
    });
  });
}

/**
 * Sets up process event listeners for graceful shutdown and error handling.
 */
function setupGracefulShutdown(server: http.Server): void {
  const shutdownSignals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT'];

  // Warning handler
  process.on('warning', (warning) => {
    logger.warn(`Process warning: ${warning.message}`, { stack: warning.stack });
  });

  // Uncaught exception handler
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', { error, stack: error.stack });
    shutdownServer(server, 1);
  });

  // Unhandled rejection handler
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', { promise, reason });
    shutdownServer(server, 1);
  });

  // Signal handlers for graceful shutdown
  shutdownSignals.forEach((signal) => {
    process.on(signal, async () => {
      logger.info(`Received ${signal}, initiating graceful shutdown...`);
      shutdownServer(server, 0);
    });
  });
}

/**
 * Shuts down the HTTP server and exits the process.
 */
function shutdownServer(server: http.Server, exitCode: number): void {
  server.close((err) => {
    if (err) {
      logger.error('Error during server shutdown:', { error: err });
      process.exit(1);
    }
    logger.info('Server shut down successfully.');
    process.exit(exitCode);
  });
}

/**
 * Main entry point to run the application.
 */
export async function run(): Promise<void> {
  try {
    const config: ServerConfig = {
      port: Number(process.env.PORT) || DEFAULT_PORT,
      corsOrigins: process.env.CORS?.split(','),
      isProduction: process.env.NODE_ENV === 'production',
    };

    const server = await startServer(config);
    setupGracefulShutdown(server);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
