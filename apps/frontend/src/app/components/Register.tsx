'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { api } from '../query-provider';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
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

const classNameOfInput =
  'w-full border border-[#ececf2] p-2 rounded-sm text-sm mt-2  ';

const extendedResitrationSchema = RegisterSchema.extend({
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'], // set path of error message
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
    <div className="w-full h-screen flex flex-col justify-center items-center ">
      <form
        className="w-[80%] md:w-[50%] sm:w-[60%] xl:w-[35%]  flex flex-col gap-4 bg-white p-10 "
        onSubmit={handleSubmit(formSubmit)}
      >
        <h1 className="text-2xl ">Create an Account</h1>
        <label>
          <span className="text-sm ">Userame</span>
          <input
            type="text"
            {...register('user_name')}
            className={classNameOfInput}
          />
          {errors.user_name && (
            <div className="text-red-600 text-xs">{`${errors.user_name.message}`}</div>
          )}
        </label>

        <label>
          <span className="text-sm ">Email</span>
          <input
            type="email"
            {...register('email')}
            className={classNameOfInput}
          />
        </label>
        {errors.email && (
          <div className="text-red-600 text-xs">{`${errors.email.message}`}</div>
        )}

        <label>
          <span className="text-sm ">Password</span>
          <div className="relative w-full flex items-center justify-center">
            <input
              type={types.typeOfPassword}
              {...register('password')}
              className={` ${classNameOfInput}`}
            />
            <div
              className="absolute right-2 top-5 "
              onClick={handleTogglePassword}
            >
              {toggleHiddenIcon.toggleIconOfPassword ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </div>
          </div>
          {errors.password && (
            <div className="text-red-600 text-xs">{`${errors.password.message}`}</div>
          )}
        </label>

        <label>
          <span className="text-sm ">Confirm Password</span>
          <div className="relative w-full flex items-center justify-center">
            <input
              type={types.typeOfConfirmPassword}
              {...register('confirm_password')}
              className={` ${classNameOfInput}`}
            />
            <div
              className="absolute right-2 top-5 "
              onClick={handleToggleConfirmPassword}
            >
              {toggleHiddenIcon.toggleIconOfConfirmPassword ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </div>
          </div>
          {errors.confirm_password && (
            <div className="text-red-600 text-xs">{`${errors.confirm_password.message}`}</div>
          )}
        </label>
        <button className="flex justify-center bg-[#3e38f5]  hover:bg-blue-800 hover:transiton duration-700 py-2 text-white text-sm ">
          {registerData.isPending ? (
            <ScaleLoader color="white" height={16} />
          ) : (
            'Register'
          )}
        </button>
        <div className="w-full text-center">
          <Link href="/auth/login">
            {' '}
            <p className="text-xs text-blue-800">Already have an account?</p>
          </Link>
        </div>
      </form>
    </div>
  );
};
