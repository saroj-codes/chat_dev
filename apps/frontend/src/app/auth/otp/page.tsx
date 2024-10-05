import React, { Suspense } from 'react';
import OtpPage from '../../components/OtpPage';
import AnimationTwo from '../../components/icons/animation2';

const Otp = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col md:flex-row  border-2 px-10 border-[#BBC8FC] justify-center items-center gap-10 rounded-2xl shadow-2xl">
          <div>
            <AnimationTwo />
          </div>
          <div>
            <OtpPage />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Otp;
