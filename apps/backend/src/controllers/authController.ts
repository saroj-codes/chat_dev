import { initServer } from '@ts-rest/express';
import { AuthContract } from '@./contract';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../services/auth';

const prisma = new PrismaClient();
const s = initServer();

export const AuthController = s.router(AuthContract, {
  RegisterUser: async ({ body }) => {
    try {
      const hash_password = await hashPassword(body.password);
      await prisma.user.create({
        data: {
          user_name: body.user_name,
          email: body.email,
          password: hash_password,
        },
      });
      return {
        status: StatusCodes.CREATED,
        body: {
          message: 'User Created SUccessfully',
          success: true,
        },
      };
    } catch (error) {
      console.log('error', error);
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          message: 'Internal Server Error',
          success: false,
        },
      };
    }
  },
  LoginUser: async ({ body }) => {
    try {
      const UserExist = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!UserExist) {
        return {
          status: StatusCodes.NOT_FOUND,
          body: {
            message: 'User doesnot Exist',
            success: false,
          },
        };
      }
      const isPasswordValid = await comparePassword(
        body.password,
        UserExist.password
      );
      if (!isPasswordValid) {
        return {
          status: StatusCodes.UNAUTHORIZED,
          body: {
            message: 'Password doesnot match',
            success: false,
          },
        };
      }
      return {
        status: StatusCodes.OK,
        body: {
          message: 'Login Successfull',
          success: true,
        },
      };
    } catch (error) {
      console.log('error', error);
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          message: 'Internal Server Error',
          success: false,
        },
      };
    }
  },
});
