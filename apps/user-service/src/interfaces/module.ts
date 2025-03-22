import { G_TYPES, ICommandBus, IQueryBus } from '@restaurant/core-domain';
import { UserServiceHandlers } from '@restaurant/shared-proto-ts';
import { AsyncContainerModule, interfaces } from 'inversify';
import { TYPES } from '../config/types';
import { userHandler } from './grpc/user/grpc_handler';

export const module = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<UserServiceHandlers>(TYPES.UserHandler).toDynamicValue((ctx) =>
    userHandler({
      commandBus: ctx.container.get<ICommandBus>(G_TYPES.CommandBus),
      queryBus: ctx.container.get<IQueryBus>(G_TYPES.QueryBus),
    }),
  );
});
