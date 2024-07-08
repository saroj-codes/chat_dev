'use client';
import React from 'react';
import EmailIcon from './icons/email';
import { useState } from 'react';
import { api } from '../query-provider';
import { useToster } from '../hooks/useToster';
import { useRouter } from 'next/navigation';
import { ScaleLoader } from 'react-spinners';

const ResetPassword = () => {
  const router = useRouter();
  const { notify } = useToster();
  const [email, setEmail] = useState('');
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setEmail(value);
  }

  const SendEmail = api.auth.sentLinkToResetPassword.useMutation();

  const handleSendEmail = async () => {
    await SendEmail.mutateAsync(
      {
        body: {
          email,
        },
      },
      {
        onSuccess: () => {
          notify('Email Send Successfully', 'success');
          router.push(`/auth/otp?email=${email}`);
        },
        onError: () => {
          notify('Email Send Failed', 'error');
        },
      }
    );
  };
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <div className="flex gap-[25px] flex-col w-[55%]">
        <div>
          <h1 className="text-[#09090B] text-[30px] font-bold">
            Forget your password?
          </h1>
          <p className="text-[#71717A] text-[15px]">
            Enter your Email and OTP to verification
          </p>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Email"
                onChange={handleChange}
                className="border-2 border-[#BBC8FC] pl-12 pr-4 w-full py-3 bg-[#E9EEFE] text-[#C3C8EC] rounded-md placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
              />
              <div
                className="absolute top-2.5 left-0 pl-3  
            flex items-center  
            pointer-events-none"
              >
                <EmailIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <button
            className="py-3 bg-[#8098F9] text-center rounded-lg font-bold text-[17px] text-white cursor-pointer"
            onClick={handleSendEmail}
          >
            {SendEmail.isPending ? (
              <ScaleLoader color="white" height={12} />
            ) : (
              'GET OTP'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
