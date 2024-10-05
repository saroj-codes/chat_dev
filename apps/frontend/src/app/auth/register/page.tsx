import React from 'react';
import { Register } from '../../components/Register';
import Animation from '../../components/icons/animation';
import AnimationFive from '../../components/icons/animation5';

const RegisterPage = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col md:flex-row  border-2 py-4 px-10 gap-6 border-[#BBC8FC] justify-center items-center rounded-2xl shadow-2xl">
          <div className="w-[450px]">
            <AnimationFive />
          </div>
          <div className="w-full">
            <Register />
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
