import { z } from 'zod';
import { UserSchema } from '@./backend-db';

export const ErrorSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export const SuccessSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export const RegisterSchema = UserSchema.pick({
  user_name: true,
  email: true,
  password: true,
});
export type TRegisterSchema = z.infer<typeof RegisterSchema>;

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type TLoginResponseSchema = z.infer<typeof LoginSchema>;
