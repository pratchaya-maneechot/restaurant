import { IQueryHandler } from '@restaurant/core-domain';
import { and, like, sql, SQL } from 'drizzle-orm';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types';
import { UserModel } from '../../../domain/models';
import { IUserRepository } from '../../../domain/repositories';
import { lower, users } from '../../../domain/tables';
import { GetUsersQuery } from './definitions/get_users';

@injectable()
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery, UserModel[]> {
  queryToHandle = GetUsersQuery.name;
  constructor(@inject(TYPES.UserRepository) private readonly _repository: IUserRepository) {}

  async execute({ q }: GetUsersQuery) {
    const query = this._repository.query.select().from(users);
    const conditions: SQL[] = [sql`1=1`];

    if (q) {
      conditions.push(like(lower(users.name), `%${q.toLowerCase()}%`));
    }

    if (conditions.length > 1) {
      return await query.where(and(...conditions));
    }

    return await query;
  }
}
