import React from 'react';
import OtpPage from '../../components/OtpPage';

const Otp = () => {
  return (
    <div className="w-full h-screen flex flex-col sm:flex-row">
      <div className="w-full sm:w-[60%]">
        <OtpPage />
      </div>
      <div className="w-full sm:w-[60%] ">
        <img src="/otp.png" alt="cover image of login" className=" h-[90%]" />
      </div>
    </div>
  );
};

export default Otp;
