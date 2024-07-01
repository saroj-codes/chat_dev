import { initContract } from '@ts-rest/core';
import {
  ErrorSchema,
  LoginSchema,
  RegisterSchema,
  SuccessSchema,
} from './schema';

const c = initContract();

export const AuthContract = c.router({
  RegisterUser: {
    method: 'POST',
    path: '/register',
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
    path: '/login',
    responses: {
      200: SuccessSchema,
      403: ErrorSchema,
      401: ErrorSchema,
      500: ErrorSchema,
    },
    body: LoginSchema,
    summary: 'This API is used for Login user',
  },
});
