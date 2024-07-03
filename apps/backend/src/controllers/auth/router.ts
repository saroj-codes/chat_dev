import { AuthContract } from '@./contract';
import { initServer } from '@ts-rest/express';
import { AuthMutationHandler } from './mutation';

const s = initServer();

export const AuthRouter = s.router(AuthContract, {
  RegisterUser: {
    middleware: [],
    handler: AuthMutationHandler.RegisterUser,
  },
  LoginUser: {
    middleware: [],
    handler: AuthMutationHandler.LoginUser,
  },
});
