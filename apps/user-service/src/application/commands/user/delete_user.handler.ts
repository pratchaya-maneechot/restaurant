import { ICommandHandler } from '@restaurant/core-domain';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../configs/types';
import { IUserRepository } from '../../../domain/repositories';
import { DeleteUserCommand } from './definitions/delete_user';

@injectable()
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand> {
  commandToHandle = DeleteUserCommand.name;

  constructor(@inject(TYPES.UserRepository) private readonly _repository: IUserRepository) {}

  async handle(command: DeleteUserCommand) {
    return this._repository.delete(command.guid);
  }
}
