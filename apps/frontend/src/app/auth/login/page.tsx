import React from 'react';
import { Login } from '../../components/Login';
import Animation from '../../components/icons/animation';

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex flex-col sm:flex-row">
      <div className="w-full sm:w-[60%]">
        <Login />
      </div>
      <div className="w-full sm:w-[45%] ">
        {/* <img
          src="/coverImg.jpg"
          alt="cover image of login"
          className="w-full h-full object-cover"
        /> */}
        <Animation />
      </div>
    </div>
  );
};
export default LoginPage;
