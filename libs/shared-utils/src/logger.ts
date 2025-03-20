import { createGcpLoggingPinoConfig } from '@google-cloud/pino-logging-gcp-config';
import pino, { Level, Logger, LoggerOptions } from 'pino';
import pretty from 'pino-pretty';

interface LoggerConfig {
  serviceName?: string;
  serviceVersion?: string;
  defaultLogLevel?: Level;
  nodeEnv?: string;
}

const isProduction = (env: string | undefined): boolean => env === 'production';

const DEFAULTS = {
  SERVICE_NAME: 'graphql-gateway',
  NODE_ENV: 'development',
  LOG_LEVEL: 'info' as const,
  REDACT_PATHS: ['*.password', '*.token', '*.secret'],
} satisfies Record<string, string | string[]>;

export class PinoLogger {
  private readonly logger: Logger;
  private readonly config: Required<LoggerConfig>;

  constructor(config: LoggerConfig = {}) {
    this.config = {
      serviceName: config.serviceName ?? process.env['SERVICE_NAME'] ?? DEFAULTS.SERVICE_NAME,
      serviceVersion: config.serviceVersion ?? process.env['SERVICE_VERSION'] ?? 'vLocal-dev',
      defaultLogLevel: (config.defaultLogLevel ?? process.env['LOG_LEVEL'] ?? DEFAULTS.LOG_LEVEL) as Level,
      nodeEnv: config.nodeEnv ?? process.env['NODE_ENV'] ?? DEFAULTS.NODE_ENV,
    };

    this.logger = isProduction(this.config.nodeEnv) ? this.createProductionLogger() : this.createDevelopmentLogger();
  }

  private createProductionLogger(): Logger {
    const gcpConfig = {
      serviceContext: {
        service: this.config.serviceName,
        version: this.config.serviceVersion,
      },
      level: this.config.defaultLogLevel,
      redact: DEFAULTS.REDACT_PATHS,
      serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
      },
    };

    return pino(createGcpLoggingPinoConfig(gcpConfig, { level: gcpConfig.level }));
  }

  private createDevelopmentLogger(): Logger {
    const prettyStream = pretty({
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:mm:ss',
      ignore: 'pid,hostname',
    });

    const options: LoggerOptions = {
      level: this.config.defaultLogLevel,
      timestamp: pino.stdTimeFunctions.isoTime,
      base: {
        env: this.config.nodeEnv,
        service: this.config.serviceName,
        version: this.config.serviceVersion,
      },
      redact: DEFAULTS.REDACT_PATHS,
      serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
      },
      formatters: {
        level: (label: string) => ({ level: label.toUpperCase() }),
      },
    };

    return pino(options, prettyStream);
  }

  public getLogger(): Logger {
    return this.logger;
  }

  public createChild(bindings: Record<string, unknown>): Logger {
    return this.logger.child(bindings);
  }

  public setLogLevel(level: Level): void {
    this.logger.level = level;
  }

  public info(msg: string, ...args: any[]): void {
    this.logger.info(msg, ...args);
  }

  public error(msg: string, ...args: any[]): void {
    this.logger.error(msg, ...args);
  }

  public warn(msg: string, ...args: any[]): void {
    this.logger.warn(msg, ...args);
  }

  public debug(msg: string, ...args: any[]): void {
    this.logger.debug(msg, ...args);
  }
}

export const logger = new PinoLogger();
