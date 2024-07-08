import { initContract } from '@ts-rest/core';
import {
  ErrorSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  SuccessSchema,
} from './schema';
import { z } from 'zod';

const c = initContract();

export const AuthContract = c.router({
  RegisterUser: {
    method: 'POST',
    path: '/auth/register',
    responses: {
      201: SuccessSchema,
      403: ErrorSchema,
      500: ErrorSchema,
    },
    body: RegisterSchema,
    summary: 'This API is used for Register user',
  },
  LoginUser: {
    method: 'POST',
    path: '/auth/login',
    responses: {
      200: SuccessSchema,
      403: ErrorSchema,
      401: ErrorSchema,
      500: ErrorSchema,
    },
    body: LoginSchema,
    summary: 'This API is used for Login user',
  },
  sentLinkToResetPassword: {
    method: 'POST',
    path: '/auth/sentLinkToResetPassword',
    body: z.object({
      email: z.string().email(),
    }),
    responses: {
      200: SuccessSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'This API is used to send Mail',
  },
  handleResetPassword: {
    method: 'POST',
    path: '/auth/handleResetPassword',
    body: ResetPasswordSchema,
    responses: {
      201: SuccessSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'This API is used to Reset Password',
  },

  verifyOtp: {
    method: 'POST',
    body: z.object({
      email: z.string().email(),
      otp_code: z.number(),
    }),
    path: '/auth/verifyOtp',
    responses: {
      200: SuccessSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'This API is used to verify OTP code',
  },
});
