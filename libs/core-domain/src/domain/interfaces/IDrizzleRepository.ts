import { InferInsertModel, InferSelectModel, SQL, SQLWrapper, Table } from 'drizzle-orm';
import { PgColumn, PgSelectBuilder, SelectedFields } from 'drizzle-orm/pg-core';

export type WhereCondition = SQL | SQLWrapper | undefined;

export interface IDrizzleRepository<T extends Table> {
  create(input: InferInsertModel<T> | InferInsertModel<T>[]): Promise<InferSelectModel<T>>;
  update(
    id: string,
    input: Partial<InferSelectModel<T>> | Partial<InferSelectModel<T>>[],
  ): Promise<InferSelectModel<T>>;
  delete(id: string): Promise<void>;
  deleteMany(where: WhereCondition): Promise<void>;
  query: {
    select: {
      (): PgSelectBuilder<undefined>;
      <TSelection extends SelectedFields>(fields: TSelection): PgSelectBuilder<TSelection>;
    };
    selectDistinct: {
      (): PgSelectBuilder<undefined>;
      <TSelection extends SelectedFields>(fields: TSelection): PgSelectBuilder<TSelection>;
    };
    selectDistinctOn: {
      (on: (PgColumn | SQLWrapper)[]): PgSelectBuilder<undefined>;
      <TSelection extends SelectedFields>(
        on: (PgColumn | SQLWrapper)[],
        fields: TSelection,
      ): PgSelectBuilder<TSelection>;
    };
  };
}
