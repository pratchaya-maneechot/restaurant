import { ConflictException, ICommandHandler } from '@restaurant/core-domain';
import { hash } from 'argon2';
import { eq } from 'drizzle-orm';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types';
import { IUserRepository } from '../../../domain/repositories';
import { users } from '../../../domain/tables';
import { RegisterUserCommand } from './definitions/register_user';

@injectable()
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
  commandToHandle = RegisterUserCommand.name;

  constructor(@inject(TYPES.UserRepository) private readonly _repository: IUserRepository) {}

  async handle(command: RegisterUserCommand) {
    command.input.id = command.guid;
    command.input.password = await hash(command.input.password);

    const [prev] = await this._repository.query.select().from(users).where(eq(users.email, command.input.email));
    if (prev) {
      throw new ConflictException(`Email is already used`);
    }

    const resp = await this._repository.create(command.input);
    return resp;
  }
}
