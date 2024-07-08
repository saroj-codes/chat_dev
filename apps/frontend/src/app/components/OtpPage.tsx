'use client';
import React, { useState } from 'react';
import OtpInput from './Otp';
import { api } from '../query-provider';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useToster } from '../hooks/useToster';
import { ScaleLoader } from 'react-spinners';

const OtpPage = () => {
  const { notify } = useToster();

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const [otp, setOtp] = useState(0);

  const verifyOtp = api.auth.verifyOtp.useMutation();

  async function handleVerifyOtp() {
    await verifyOtp.mutateAsync(
      {
        body: {
          email: email || '',
          otp_code: +otp,
        },
      },
      {
        onSuccess: () => {
          router.push(`/auth/newPassword?email=${email}`);
          notify('OTP Verified', 'success');
        },
        onError: (error) => {
          notify('OTP Verification Failed', 'error');
        },
      }
    );
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
        <div className="flex gap-[25px] flex-col">
          <div>
            <h1 className="text-[#09090B] text-[30px] font-bold">Enter OTP</h1>
            <p className="text-[#71717A] text-[15px]">
              Sent OTP on&nbsp;
              <span className="text-[#8098F9]">{email}</span>
            </p>
          </div>
          <div>
            <OtpInput length={6} onChange={setOtp} />
          </div>
          <div className="flex flex-col gap-[15px]">
            <button
              className="py-3 bg-[#8098F9] text-center rounded-lg font-bold text-[17px] text-white cursor-pointer"
              onClick={handleVerifyOtp}
            >
              {verifyOtp.isPending ? (
                <ScaleLoader color="white" height={12} />
              ) : (
                'SUBMIT'
              )}
            </button>
            <span className="text-[16px] text-[#8098F9] text-center font-bold">
              Resent OTP
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
