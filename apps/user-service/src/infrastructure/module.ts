import { AuthProvider, G_TYPES, IAuthProvider, ICommandBus, IQuery, IQueryBus } from '@restaurant/core-domain';
import { AsyncContainerModule, interfaces } from 'inversify';
import { TYPES } from '../config/types';
import { IUserRepository } from '../domain/repositories';
import { CommandBus } from './command_bus';
import { QueryBus } from './query_bus';
import { UserRepository } from './repository/user';

export const module = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<ICommandBus>(G_TYPES.CommandBus).toConstantValue(new CommandBus());
  bind<IQueryBus<IQuery>>(G_TYPES.QueryBus).toConstantValue(new QueryBus());
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
  bind<IAuthProvider>(G_TYPES.AuthProvider).to(AuthProvider).inSingletonScope();
});
