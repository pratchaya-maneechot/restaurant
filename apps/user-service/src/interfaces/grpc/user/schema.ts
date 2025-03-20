import { z } from 'zod';
import { UserInsertSchema } from '../../../domain/models';

export const RegisterUserSchema = UserInsertSchema;
export const UpdateUserSchema = UserInsertSchema.partial().extend({ userId: z.string() });
