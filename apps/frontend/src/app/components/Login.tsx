/* eslint-disable @nx/enforce-module-boundaries */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, TLoginSchema } from 'libs/contract/src/auth/schema';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { api } from '../query-provider';
import Link from 'next/link';
import { useToster } from '../hooks/useToster';
import { useRouter } from 'next/navigation';
import { ScaleLoader } from 'react-spinners';
import GoogleIcon from './icons/google';
import FacebookIcon from './icons/facebook';
import EmailIcon from './icons/email';
import PasswordIcon from './icons/password';
import CloseEye from './icons/closeEye';
import OpenEye from './icons/openEye';

export const Login = () => {
  const { notify } = useToster();
  const router = useRouter();
  const [type, setType] = useState({
    typesPassword: 'password',
    toggleIcons: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const loginData = api.auth.LoginUser.useMutation();

  const handleLoginSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    try {
      await loginData.mutateAsync(
        {
          body: {
            email: data.email,
            password: data.password,
          },
        },
        {
          onSuccess: (data) => {
            notify(data.body.message, 'success');
            router.push('/auth/register');
          },
          onError: (error) => {
            if (
              error.status === 401 ||
              error.status === 403 ||
              error.status === 500
            ) {
              notify(error.body.message, 'error');
            } else {
              notify('login failed', 'error');
            }
          },
        }
      );
    } catch (e) {
      console.log(e);
      notify('Login failed', 'error');
    }
  };

  const handleTogglehiddenIcon = () => {
    if (type.typesPassword === 'password') {
      setType({ ...type, typesPassword: 'text', toggleIcons: true });
    } else {
      setType({ ...type, typesPassword: 'password', toggleIcons: false });
    }
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
        <div className="flex gap-[25px] flex-col">
          <div>
            <h1 className="text-[#09090B] text-[30px] font-bold">
              Login to your Account
            </h1>
            <p className="text-[#71717A] text-[15px]">
              Welcome back! Select method to log in:
            </p>
          </div>
          <div className="flex items-center gap-[40px]">
            <div className="flex items-center gap-[10px] border-2 border-[#BBC8FC] px-5 py-1 rounded-lg cursor-pointer">
              <GoogleIcon />
              <span className="09090B font-medium text-[20px]">Google</span>
            </div>
            <div className="flex items-center gap-[10px] border-2 border-[#BBC8FC] px-5 py-1 rounded-lg cursor-pointer">
              <FacebookIcon />
              <span className="09090B font-medium text-[20px]">Facebook</span>
            </div>
          </div>
          <div className="relative flex items-center">
            <div className="flex-grow border-t-2 border-[#71717A]"></div>
            <span className="flex-shrink mx-4 text-[#71717A] font-medium text-[15px]">
              or continue with email
            </span>
            <div className="flex-grow border-t-2 border-[#71717A]"></div>
          </div>
          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[10px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Email"
                    {...register('email')}
                    className="border-2 border-[#BBC8FC] pl-12 pr-4 w-full py-3 bg-[#E9EEFE] text-[#C3C8EC] rounded-md placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
                  />
                  {errors.email && (
                    <div className="text-red-600 text-sm">{`${errors.email.message}`}</div>
                  )}
                  <div
                    className="absolute top-2.5 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
                  >
                    <EmailIcon />
                  </div>
                </div>
                <div className="relative">
                  <input
                    type={type.typesPassword}
                    placeholder="Password"
                    {...register('password')}
                    className="border-2 border-[#BBC8FC] pl-12 pr-4 w-full py-3 bg-[#E9EEFE] text-[#C3C8EC] rounded-md placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
                  />
                  {errors.password && (
                    <div className="text-red-600 text-sm">{`${errors.password.message}`}</div>
                  )}
                  <div
                    className="absolute right-2 top-2.5 cursor-pointer"
                    onClick={handleTogglehiddenIcon}
                  >
                    {type.toggleIcons ? <OpenEye /> : <CloseEye />}
                  </div>
                  <div
                    className="absolute top-2.5 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
                  >
                    <PasswordIcon />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <input type="checkbox" />
                  <span className="text-[#71717A] text-[16px]">
                    Remember me
                  </span>
                </div>
                <Link href={'/auth/resetPassword'}>
                  <p className="text-[#8098F9] font-semibold text-[16px] cursor-pointer">
                    Forgot Password?
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-[20px] pt-[25px]">
              <button className="py-3 bg-[#8098F9] text-center rounded-lg font-bold text-[17px] text-white cursor-pointer">
                {loginData.isPending ? (
                  <ScaleLoader color="white" height={14} />
                ) : (
                  'LOG IN'
                )}
              </button>
              <div className="text-center text-[16px] text-[#71717A] ">
                Don&apos;t have account?&nbsp;
                <Link href={'/auth/register'}>
                  <span className="font-bold text-[#8098F9] cursor-pointer">
                    Create an account
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
