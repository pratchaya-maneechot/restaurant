import { ICommandHandler } from '@restaurant/core-domain';
import { hash } from 'argon2';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../configs/types';
import { IUserRepository } from '../../../domain/repositories';
import { RegisterUserCommand } from './definitions/register_user';

@injectable()
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
  commandToHandle = RegisterUserCommand.name;

  constructor(@inject(TYPES.UserRepository) private readonly _repository: IUserRepository) {}

  async handle(command: RegisterUserCommand) {
    command.input.id = command.guid;
    command.input.password = await hash(command.input.password);
    return this._repository.create(command.input);
  }
}
