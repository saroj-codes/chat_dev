import React from 'react';
import { Login } from '../../components/Login';

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex flex-col sm:flex-row">
      <div className="w-full sm:w-[50%]">
        <Login />
      </div>
      <div className="w-full sm:w-[50%] ">
        <img
          src="/coverImg.jpg"
          alt="cover image of login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
export default LoginPage;
