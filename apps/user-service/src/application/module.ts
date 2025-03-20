import { AsyncContainerModule, interfaces } from 'inversify';

import { configures as commandConfigures } from './commands';
import { configures as queryConfigures } from './queries';

export const module = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  commandConfigures(bind);
  queryConfigures(bind);
});
