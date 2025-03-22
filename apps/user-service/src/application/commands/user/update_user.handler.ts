import { ICommandHandler } from '@restaurant/core-domain';
import { hash } from 'argon2';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types';
import { IUserRepository } from '../../../domain/repositories';
import { UpdateUserCommand } from './definitions/update_user';

@injectable()
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  commandToHandle = UpdateUserCommand.name;

  constructor(@inject(TYPES.UserRepository) private readonly _repository: IUserRepository) {}

  async handle(command: UpdateUserCommand) {
    if (command.input.password) {
      command.input.password = await hash(command.input.password);
    }
    return this._repository.update(command.guid, command.input);
  }
}
