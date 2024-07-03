import { AuthContract } from '@./contract';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../../services/auth';
import { db } from '@./backend-db';
import { AppRouteImplementationOrOptions } from '@ts-rest/express/src/lib/types';

const RegisterUser: AppRouteImplementationOrOptions<
  typeof AuthContract.RegisterUser
> = async ({ body }) => {
  try {
    const hash_password = await hashPassword(body.password);
    await db.user.create({
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
    console.log(error.message);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      body: {
        message: error.message || 'Internal Server Error',
        success: false,
      },
    };
  }
};

const LoginUser: AppRouteImplementationOrOptions<
  typeof AuthContract.LoginUser
> = async ({ body }) => {
  try {
    const UserExist = await db.user.findUnique({
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
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      body: {
        message: error.message || 'Internal Server Error',
        success: false,
      },
    };
  }
};

export const AuthMutationHandler = {
  RegisterUser,
  LoginUser,
};
