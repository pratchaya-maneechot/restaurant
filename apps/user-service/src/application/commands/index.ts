import { G_TYPES, ICommandHandler } from '@restaurant/core-domain';
import { interfaces } from 'inversify';
import { DeleteUserCommand } from './user/definitions/delete_user';
import { RegisterUserCommand } from './user/definitions/register_user';
import { UpdateUserCommand } from './user/definitions/update_user';
import { DeleteUserCommandHandler } from './user/delete_user.handler';
import { RegisterUserCommandHandler } from './user/register_user.handler';
import { UpdateUserCommandHandler } from './user/update_user.handler';

export const configures = (bind: interfaces.Bind) => {
  bind<ICommandHandler<RegisterUserCommand>>(G_TYPES.CommandHandler).to(RegisterUserCommandHandler);
  bind<ICommandHandler<UpdateUserCommand>>(G_TYPES.CommandHandler).to(UpdateUserCommandHandler);
  bind<ICommandHandler<DeleteUserCommand>>(G_TYPES.CommandHandler).to(DeleteUserCommandHandler);
};
