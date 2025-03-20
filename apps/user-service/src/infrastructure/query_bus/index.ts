import { DomainException, IQuery, IQueryBus, IQueryHandler } from '@restaurant/core-domain';
import { injectable } from 'inversify';

@injectable()
export class QueryBus<BaseQuery extends IQuery = IQuery> implements IQueryBus<BaseQuery> {
  handlers: Map<string, IQueryHandler<BaseQuery>> = new Map();

  registerHandler(handler: IQueryHandler<BaseQuery>) {
    const queryName = handler.queryToHandle;
    if (this.handlers.has(queryName)) {
      return;
    }
    this.handlers.set(queryName, handler);
  }

  async execute<T extends BaseQuery = BaseQuery, R = any>(query: T) {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) {
      throw new DomainException(`Query handler ${query.constructor.name} not register`);
    }
    return handler.execute(query) as R;
  }
}
