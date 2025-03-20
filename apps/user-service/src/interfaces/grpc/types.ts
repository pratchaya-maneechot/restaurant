import { ICommandBus, IQueryBus } from '@restaurant/core-domain';

export interface IContextHandler {
  commandBus: ICommandBus;
  queryBus: IQueryBus;
}
