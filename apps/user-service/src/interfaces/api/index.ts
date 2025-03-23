import 'reflect-metadata';
//
import './controllers';
//
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
  });

  server.setErrorConfig(() => {
    //
  });

  const api: Application = server.build();
  api.listen(config.API_PORT, () => {
    //
  });
})();
