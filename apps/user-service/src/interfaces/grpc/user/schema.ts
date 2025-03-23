import { z } from 'zod';
import { UserInsertSchema } from '../../../domain/models';

export const RegisterUserSchema = UserInsertSchema.omit({
  role: true,
});
export const UpdateUserSchema = RegisterUserSchema.omit({ email: true }).partial().extend({ userId: z.string() });
