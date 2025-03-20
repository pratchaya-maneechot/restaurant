import { eq, InferInsertModel, InferSelectModel, SQL, Table } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { injectable, unmanaged } from 'inversify';
import { IDrizzleRepository } from './interfaces/IDrizzleRepository';

@injectable()
export abstract class BaseDrizzleRepository<T extends Table, TSchema extends PostgresJsDatabase<any>>
  implements IDrizzleRepository<T>
{
  private readonly boundSelect: typeof this.db.select;
  private readonly boundSelectDistinct: typeof this.db.selectDistinct;
  private readonly boundSelectDistinctOn: typeof this.db.selectDistinctOn;

  constructor(
    @unmanaged() protected readonly db: TSchema,
    @unmanaged() private readonly table: any,
  ) {
    this.boundSelect = this.db.select.bind(this.db);
    this.boundSelectDistinct = this.db.selectDistinct.bind(this.db);
    this.boundSelectDistinctOn = this.db.selectDistinctOn.bind(this.db);
  }

  get query() {
    return {
      select: this.boundSelect,
      selectDistinct: this.boundSelectDistinct,
      selectDistinctOn: this.boundSelectDistinctOn,
    };
  }

  async create(input: InferInsertModel<T> | InferInsertModel<T>[]): Promise<InferSelectModel<T>> {
    const [result] = await this.db.insert(this.table).values(input).returning();
    return result;
  }

  async update(
    id: string,
    input: Partial<InferSelectModel<T>> | Partial<InferSelectModel<T>>[],
  ): Promise<InferSelectModel<T>> {
    const [result] = await this.db.update(this.table).set(input).where(eq(this.table.id, id)).returning();
    return result as InferSelectModel<T>;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(this.table).where(eq(this.table.id, id));
  }

  async deleteMany(where: SQL | undefined): Promise<void> {
    await this.db.delete(this.table).where(where);
  }
}
