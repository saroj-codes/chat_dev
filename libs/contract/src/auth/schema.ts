import { z } from 'zod';
import { UserSchema } from '../__generated__';

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

export const UserDataSchema = UserSchema.pick({
  id: true,
  user_name: true,
  email: true,
});
export type TUserDataSchema = z.infer<typeof UserDataSchema>;

export type TRegistrationSchema = z.infer<typeof RegisterSchema>;

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

export const ResetPasswordSchema = z.object({
  email: z.string().optional(),
  new_password: z.string(),
});
export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
