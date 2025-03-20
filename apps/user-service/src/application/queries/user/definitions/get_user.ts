import { IQuery } from '@restaurant/core-domain';

export class GetUserQuery implements IQuery {
  constructor(public readonly id: string) {}
}
