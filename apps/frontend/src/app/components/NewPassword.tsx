/* eslint-disable @nx/enforce-module-boundaries */
'use client';

import React, { useState } from 'react';
import OpenEye from './icons/openEye';
import CloseEye from './icons/closeEye';
import PasswordIcon from './icons/password';
import { api } from '../query-provider';
import { useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  ResetPasswordSchema,
  TResetPasswordSchema,
} from 'libs/contract/src/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToster } from '../hooks/useToster';
import { ScaleLoader } from 'react-spinners';

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { notify } = useToster();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const resetPassword = api.auth.handleResetPassword.useMutation();

  const handleResetPassword: SubmitHandler<TResetPasswordSchema> = async (
    data
  ) => {
    await resetPassword.mutateAsync(
      {
        body: {
          email: email || '',
          new_password: data.new_password,
        },
      },
      {
        onSuccess: () => {
          notify('Password Changed Successfully', 'success');
        },
        onError: () => {
          notify('Password Changed Failed', 'error');
        },
      }
    );
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
        <div className="flex gap-[25px] flex-col">
          <div>
            <h1 className="text-[#09090B] text-[30px] font-bold">
              Enter your new password
            </h1>
            <p className="text-[#71717A] text-[15px]">
              This is the last step in recovering your password.
            </p>
          </div>
          <form onSubmit={handleSubmit(handleResetPassword)}>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[10px]">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    {...register('new_password')}
                    className="border-2 border-[#BBC8FC] pl-12 pr-4 w-full py-3 bg-[#E9EEFE] text-[#C3C8EC] rounded-md placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
                  />
                  {errors.new_password && (
                    <div className="text-red-600 text-sm">{`${errors.new_password.message}`}</div>
                  )}
                  <div
                    className="absolute right-2 top-2.5 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <OpenEye /> : <CloseEye />}
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
            </div>
            <div className="flex flex-col gap-[20px] pt-[25px]">
              <button
                className="py-3 bg-[#8098F9] text-center rounded-lg font-bold text-[17px] text-white cursor-pointer"
                type="submit"
              >
                {resetPassword.isPending ? (
                  <ScaleLoader color="white" height={12} />
                ) : (
                  'SUBMIT'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
