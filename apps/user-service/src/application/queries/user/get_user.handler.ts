import { IQueryHandler } from '@restaurant/core-domain';
import { eq } from 'drizzle-orm';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types';
import { UserModel } from '../../../domain/models';
import { IUserRepository } from '../../../domain/repositories';
import { users } from '../../../domain/tables';
import { GetUserQuery } from './definitions/get_user';

@injectable()
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery, UserModel | null> {
  queryToHandle = GetUserQuery.name;
  constructor(@inject(TYPES.UserRepository) private readonly _repository: IUserRepository) {}

  async execute({ id }: GetUserQuery) {
    const [resp] = await this._repository.query.select().from(users).where(eq(users.id, id));
    return resp;
  }
}
