import { IDrizzleRepository } from '@restaurant/core-domain';
import { UserTable } from './models';

export interface IUserRepository extends IDrizzleRepository<UserTable> {}
