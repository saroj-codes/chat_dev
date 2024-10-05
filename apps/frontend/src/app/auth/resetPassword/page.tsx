import React from 'react';
import ResetPassword from '../../components/ResetPassword';
import Animation from '../../components/icons/animation';
import AnimationThree from '../../components/icons/animation3';

const ResetPasswordPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex border-2 px-10 border-[#BBC8FC] justify-center items-center gap-10 rounded-2xl shadow-2xl">
        <div className="w-[450px]">
          <AnimationThree />
        </div>
        <div>
          <ResetPassword />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
