import { BaseDrizzleRepository } from '@restaurant/core-domain';
import { injectable } from 'inversify';
import { UserTable } from '../../domain/models';
import { IUserRepository } from '../../domain/repositories';
import { users } from '../../domain/tables';
import { dbClient, DBClient } from '../db_drizzle';

@injectable()
export class UserRepository extends BaseDrizzleRepository<UserTable, DBClient> implements IUserRepository {
  constructor() {
    super(dbClient, users);
  }
}
