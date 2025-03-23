import { InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { users } from './tables';

export const UserInsertSchema = createInsertSchema(users);
export const UserSchema = createSelectSchema(users);

export type UserTable = typeof users;
export type UserInsertModel = InferInsertModel<UserTable>;
export type UserModel = InferSelectModel<UserTable>;
