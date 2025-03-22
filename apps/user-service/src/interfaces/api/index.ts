import 'reflect-metadata';
//
import './controllers';
//
import { expressErrorLoggerMiddleware, expressLoggerMiddleware, logger } from '@restaurant/shared-utils';
import { Application, json } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { envConfig } from '../../config/env';
import { initializes } from '../../initialize';

(async () => {
  const config = envConfig();
  const container = await initializes();
  const server = new InversifyExpressServer(container);

  server.setConfig((app: Application) => {
    app.use(json());
    app.use(expressLoggerMiddleware);
  });

  server.setErrorConfig((app: Application) => {
    app.use(expressErrorLoggerMiddleware);
  });

  const api: Application = server.build();
  api.listen(config.API_PORT, () => logger.info('The application is initialized on the port %s', config.API_PORT));
})();
