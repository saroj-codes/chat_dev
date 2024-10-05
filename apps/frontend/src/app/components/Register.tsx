/* eslint-disable @nx/enforce-module-boundaries */
'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { api } from '../query-provider';
import {
  RegisterSchema,
  TRegistrationSchema,
} from 'libs/contract/src/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToster } from '../hooks/useToster';
import { ScaleLoader } from 'react-spinners';
import EmailIcon from './icons/email';
import PasswordIcon from './icons/password';
import CloseEye from './icons/closeEye';
import OpenEye from './icons/openEye';
import UserIcon from './icons/user';

const extendedResitrationSchema = RegisterSchema.extend({
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
});

export const Register = () => {
  const { notify } = useToster();
  const router = useRouter();
  const [types, setType] = useState({
    typeOfPassword: 'password',
    typeOfConfirmPassword: 'password',
  });

  const [toggleHiddenIcon, setToggleHiddenIcon] = useState({
    toggleIconOfPassword: false,
    toggleIconOfConfirmPassword: false,
  });

  const registerData = api.auth.RegisterUser.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegistrationSchema & { confirm_password: string }>({
    resolver: zodResolver(extendedResitrationSchema),
    mode: 'onChange',
    defaultValues: {
      confirm_password: '',
      email: '',
      password: '',
      user_name: '',
    },
  });

  const formSubmit: SubmitHandler<TRegistrationSchema> = async (data) => {
    try {
      await registerData.mutateAsync(
        {
          body: {
            user_name: data.user_name,
            email: data.email,
            password: data.password,
          },
        },
        {
          onSuccess: (data) => {
            router.push('/auth/login');
            notify(data.body.message || 'registration successfull', 'success');
          },
          onError: (error) => {
            if (error.status === 403 || error.status === 500) {
              notify(error.body.message, 'error');
            } else {
              notify('registration failed', 'error');
            }
          },
        }
      );
    } catch (e) {
      console.log(e);
      notify('Registration failed', 'error');
    }
  };

  const handleTogglePassword = () => {
    if (types.typeOfPassword === 'password') {
      setType({ ...types, typeOfPassword: 'text' });
      setToggleHiddenIcon({ ...toggleHiddenIcon, toggleIconOfPassword: true });
    } else {
      setType({ ...types, typeOfPassword: 'password' });
      setToggleHiddenIcon({ ...toggleHiddenIcon, toggleIconOfPassword: false });
    }
  };

  const handleToggleConfirmPassword = () => {
    if (types.typeOfConfirmPassword === 'password') {
      setType({ ...types, typeOfConfirmPassword: 'text' });
      setToggleHiddenIcon({
        ...toggleHiddenIcon,
        toggleIconOfConfirmPassword: true,
      });
    } else {
      setType({ ...types, typeOfConfirmPassword: 'password' });
      setToggleHiddenIcon({
        ...toggleHiddenIcon,
        toggleIconOfConfirmPassword: false,
      });
    }
  };

  return (
    <div className="w-full  flex flex-col gap-4 justify-center items-center">
      <div className="flex gap-[25px] flex-col">
        <div>
          <h1 className="text-[#09090B] text-[30px] font-bold">
            Create your Account
          </h1>
          <p className="text-[#71717A] text-[15px]">Unlock all Features!</p>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[10px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  {...register('user_name')}
                  className="border-2 border-[#BBC8FC] pl-12 pr-4 w-full py-3 bg-[#E9EEFE] text-[#C3C8EC] rounded-md placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
                />
                {errors.user_name && (
                  <div className="text-red-600 text-sm">{`${errors.user_name.message}`}</div>
                )}
                <div
                  className="absolute top-2.5 left-0 pl-3  
                flex items-center  
                pointer-events-none"
                >
                  <UserIcon />
                </div>
              </div>
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
                  placeholder="Password"
                  {...register('password')}
                  type={types.typeOfPassword}
                  className="border-2 border-[#BBC8FC] pl-12 pr-4 w-full py-3 bg-[#E9EEFE] text-[#C3C8EC] rounded-md placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
                />
                {errors.password && (
                  <div className="text-red-600 text-sm">{`${errors.password.message}`}</div>
                )}
                <div
                  className="absolute right-2 top-2.5 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {toggleHiddenIcon.toggleIconOfPassword ? (
                    <OpenEye />
                  ) : (
                    <CloseEye />
                  )}
                </div>
                <div
                  className="absolute top-2.5 left-0 pl-3  
                flex items-center  
                pointer-events-none"
                >
                  <PasswordIcon />
                </div>
              </div>
              <div className="relative">
                <input
                  placeholder="Confirm Password"
                  type={types.typeOfConfirmPassword}
                  {...register('confirm_password')}
                  className="border-2 border-[#BBC8FC] pl-12 pr-4 w-full py-3 bg-[#E9EEFE] text-[#C3C8EC] rounded-md placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
                />
                {errors.confirm_password && (
                  <div className="text-red-600 text-sm">{`${errors.confirm_password.message}`}</div>
                )}
                <div
                  className="absolute right-2 top-2.5 cursor-pointer"
                  onClick={handleToggleConfirmPassword}
                >
                  {toggleHiddenIcon.toggleIconOfConfirmPassword ? (
                    <OpenEye />
                  ) : (
                    <CloseEye />
                  )}
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
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" />
                <span className="text-[#71717A] text-[16px]">
                  Accept&nbsp;
                  <span className="text-[#8098F9]">terms and conditions</span>
                </span>
              </div>
            </div> */}
          </div>
          <div className="flex flex-col gap-[20px] pt-[25px]">
            <button className="py-3 bg-[#8098F9] text-center rounded-lg font-bold text-[17px] text-white cursor-pointer">
              {registerData.isPending ? (
                <ScaleLoader color="white" height={14} />
              ) : (
                'REGISTER'
              )}
            </button>
            <div className="text-center text-[16px] text-[#71717A] ">
              You have account?&nbsp;
              <Link href={'/auth/login'}>
                <span className="font-bold text-[#8098F9] cursor-pointer">
                  Login now
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
