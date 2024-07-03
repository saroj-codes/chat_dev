import React from 'react';
import { Register } from '../../components/Register';

const RegisterPage = () => {
  return (
    <>
      <div className="bg-[url('/BG.png')] h-screen bg-cover bg-center">
        <div className="w-full sm:w-[50%]">
          <Register />
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
