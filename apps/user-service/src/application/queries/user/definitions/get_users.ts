import { IQuery } from '@restaurant/core-domain';

export class GetUsersQuery implements IQuery {
  constructor(public readonly q?: string) {}
}
