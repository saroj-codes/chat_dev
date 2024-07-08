import { AuthContract } from '@./contract';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../../services/auth';
import { db } from '@./backend-db';
import { AppRouteImplementationOrOptions } from '@ts-rest/express/src/lib/types';
import { SendEmail } from '../../services/email';

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

const SentLinkToResetPassword: AppRouteImplementationOrOptions<
  typeof AuthContract.sentLinkToResetPassword
> = async ({ body }) => {
  try {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const userExist = await db.user.findFirst({
      where: {
        email: body.email,
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

    await db.otp.upsert({
      where: {
        email: body.email,
      },
      create: {
        email: body.email,
        otp_code: OTP,
      },
      update: {
        otp_code: OTP,
      },
    });

    await SendEmail({
      message: `<h1>Reset Password</h1> <p>Copy the OTP below to reset the password</p>${OTP}<p></p><a href="http://localhost:3000/auth/otp"><button>Reset Password</button></a>`,
      subject: 'OTP Number',
      to: [body.email],
    });
    return {
      status: StatusCodes.OK,
      body: {
        message: 'Email Sent successfully',
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

const ResetPassword: AppRouteImplementationOrOptions<
  typeof AuthContract.handleResetPassword
> = async ({ body }) => {
  try {
    const hash_password = await hashPassword(body.new_password);
    await db.user.update({
      where: {
        email: body.email,
      },
      data: {
        password: hash_password,
      },
    });
    return {
      status: StatusCodes.CREATED,
      body: {
        message: 'Password Changed Successfully',
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

const VerifyOtp: AppRouteImplementationOrOptions<
  typeof AuthContract.verifyOtp
> = async ({ body }) => {
  try {
    const userExist = await db.user.findFirst({
      where: {
        email: body.email,
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

    const OTPExist = await db.otp.findFirst({
      where: {
        email: body.email,
        otp_code: body.otp_code,
      },
    });
    if (!OTPExist) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          message: 'Invalid OTP',
          success: false,
        },
      };
    }
    return {
      status: StatusCodes.OK,
      body: {
        message: 'OTP Matched',
        success: true,
      },
    };
  } catch (error) {
    console.log(error);
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
  SentLinkToResetPassword,
  ResetPassword,
  VerifyOtp,
};
