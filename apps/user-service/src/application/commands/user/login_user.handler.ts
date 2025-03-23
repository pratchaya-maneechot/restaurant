import { BadRequestException, G_TYPES, IAuthProvider, ICommandHandler } from '@restaurant/core-domain';
import { verify } from 'argon2';
import { eq } from 'drizzle-orm';
import { inject, injectable } from 'inversify';
import _ from 'lodash';
import { TYPES } from '../../../config/types';
import { IUserRepository } from '../../../domain/repositories';
import { users } from '../../../domain/tables';
import { LoginUserCommand } from './definitions/login_user';

@injectable()
export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
  commandToHandle = LoginUserCommand.name;

  constructor(
    @inject(TYPES.UserRepository) private readonly _repository: IUserRepository,
    @inject(G_TYPES.AuthProvider) private readonly _authProvider: IAuthProvider,
  ) {}

  async handle(command: LoginUserCommand) {
    const { input } = command;

    const [user] = await this._repository.query.select().from(users).where(eq(users.email, input.email));
    if (!user?.password || !(await verify(user.password, input.password))) {
      throw new BadRequestException(`The email or password incorrect`);
    }

    const token = await this._authProvider.createToken(user.id, _.pick(user, 'name', 'email', 'phone', 'role'));

    return {
      user,
      token,
    };
  }
}
