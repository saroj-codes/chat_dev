import React, { Suspense } from 'react';
import NewPassword from '../../components/NewPassword';

const Newpassword = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="w-full h-screen flex flex-col sm:flex-row">
        <div className="w-full sm:w-[60%]">
          <NewPassword />
        </div>
        {/* <div className="w-full sm:w-[60%] ">
        <img src="/otp.png" alt="cover image of login" className=" h-[90%]" />
        </div> */}
      </div>
    </Suspense>
  );
};

export default Newpassword;
