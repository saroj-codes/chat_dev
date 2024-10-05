import React, { Suspense } from 'react';
import NewPassword from '../../components/NewPassword';
import AnimationFour from '../../components/icons/animation4';

const Newpassword = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="flex flex-col md:flex-row border-2   border-[#BBC8FC] justify-center items-center gap-6 rounded-2xl shadow-2xl px-10">
          <div className="w-[450px]">
            <AnimationFour />
          </div>
          <div>
            <NewPassword />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Newpassword;
