'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, TLoginSchema } from 'libs/contract/src/auth/schema';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { api } from '../query-provider';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useToster } from '../hooks/useToster';
import { useRouter } from 'next/navigation';
import { ScaleLoader } from 'react-spinners';

const classNameOfInput =
  'w-full border border-[#ececf2] p-2 rounded-sm text-sm mt-2  ';

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
            router.push('/');
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
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <form
        className="w-[90%] xl:w-[60%] lg:w-[70%] md:w-[80%] sm:w-[85%]  flex flex-col gap-4"
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <h1 className="text-2xl pb-5">Login </h1>
        <label>
          {' '}
          <span>Email</span>
          <input
            type="text"
            {...register('email')}
            className={classNameOfInput}
          />
          {errors.email && (
            <div className="text-red-600 text-xs">{`${errors.email.message}`}</div>
          )}
        </label>
        <label>
          <span className="text-sm ">Password</span>
          <div className="relative w-full flex items-center justify-center">
            <input
              type={type.typesPassword}
              {...register('password')}
              className={` ${classNameOfInput}`}
            />
            <div
              className="absolute right-2 top-5 "
              onClick={handleTogglehiddenIcon}
            >
              {type.toggleIcons ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          {errors.password && (
            <div className="text-red-600 text-xs">{`${errors.password.message}`}</div>
          )}
        </label>

        <button
          type="submit"
          className=" w-full bg-[#3e38f5] py-2 text-white text-sm hover:bg-blue-800  duration-700 "
        >
          {loginData.isPending ? (
            <ScaleLoader color="white" height={16} />
          ) : (
            'Login'
          )}
        </button>
      </form>
      <p className="text-xs flex gap-1">
        Not registered yet?{' '}
        <Link
          href="/auth/register"
          className="flex items-center text-blue-600 hover:text-blue-800 duration-500"
        >
          Create an account <FiArrowUpRight />{' '}
        </Link>
      </p>
    </div>
  );
};
