import { InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

import { users } from './tables';

export const UserInsertSchema = createInsertSchema(users);

export type UserTable = typeof users;
export type UserInsertModel = InferInsertModel<UserTable>;
export type UserModel = InferSelectModel<UserTable>;
