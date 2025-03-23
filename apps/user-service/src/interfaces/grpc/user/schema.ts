import { z } from 'zod';
import { UserInsertSchema, UserSchema } from '../../../domain/models';

export const RegisterUserSchema = UserInsertSchema.omit({
  role: true,
});
export const LoginUserSchema = UserInsertSchema.pick({
  email: true,
  password: true,
});
export const LoginUserResponseSchema = z.object({
  token: z.string(),
  user: UserSchema.pick({
    id: true,
    email: true,
    name: true,
  }),
});
export const UpdateUserSchema = RegisterUserSchema.omit({ email: true }).partial().extend({ userId: z.string() });
