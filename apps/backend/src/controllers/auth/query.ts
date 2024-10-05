import { AuthContract } from '@./contract';
import { StatusCodes } from 'http-status-codes';
import { db } from '@./backend-db';
import { AppRouteImplementationOrOptions } from '@ts-rest/express/src/lib/types';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const VerifyUser: AppRouteImplementationOrOptions<
  typeof AuthContract.verifyUser
> = async ({ req }) => {
  try {
    const token = req.cookies['saroj-x-access-token'];
    if (!token) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          message: 'Token not Found',
          success: false,
        },
      };
    }
    const verifyToken = jwt.verify(token, JWT_SECRET);
    if (!verifyToken) {
      return {
        status: StatusCodes.UNAUTHORIZED,
        body: {
          message: 'Token is not Verified',
          success: false,
        },
      };
    }
    const decodedToken = jwt.decode(token).email;

    const userExist = await db.user.findFirst({
      where: {
        email: decodedToken,
      },
    });
    if (!userExist) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          message: 'User doesnot Exist',
          success: false,
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        id: userExist.id,
        user_name: userExist.user_name,
        email: userExist.email,
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

export const AuthQueryHandler = { VerifyUser };
