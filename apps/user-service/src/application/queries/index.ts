import { G_TYPES, IQueryHandler } from '@restaurant/core-domain';
import { interfaces } from 'inversify';
import { GetUserQuery } from './user/definitions/get_user';
import { GetUsersQuery } from './user/definitions/get_users';
import { GetUserQueryHandler } from './user/get_user.handler';
import { GetUsersQueryHandler } from './user/get_users.handler';

export const configures = (bind: interfaces.Bind) => {
  bind<IQueryHandler<GetUserQuery>>(G_TYPES.QueryHandler).to(GetUserQueryHandler);
  bind<IQueryHandler<GetUsersQuery>>(G_TYPES.QueryHandler).to(GetUsersQueryHandler);
};
