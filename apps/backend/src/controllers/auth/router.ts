import { AuthContract } from '@./contract';
import { initServer } from '@ts-rest/express';
import { AuthMutationHandler } from './mutation';
import { AuthQueryHandler } from './query';

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
  sentLinkToResetPassword: {
    middleware: [],
    handler: AuthMutationHandler.SentLinkToResetPassword,
  },
  handleResetPassword: {
    middleware: [],
    handler: AuthMutationHandler.ResetPassword,
  },
  verifyOtp: {
    middleware: [],
    handler: AuthMutationHandler.VerifyOtp,
  },
  verifyUser: {
    middleware: [],
    handler: AuthQueryHandler.VerifyUser,
  },
});
