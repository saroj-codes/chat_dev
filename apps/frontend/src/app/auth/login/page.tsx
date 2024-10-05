import React from 'react';
import { Login } from '../../components/Login';
import Animation from '../../components/icons/animation';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row border-2   border-[#BBC8FC] justify-center items-center gap-6 rounded-2xl shadow-2xl px-10">
        <div className="w-full md:w-auto">
          <Animation />
        </div>
        <div className="w-full md:w-auto">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// import React from 'react';
// import { Login } from '../../components/Login';
// import Animation from '../../components/icons/animation';

// const LoginPage = () => {
//   return (
//     <div>
//       <div className="flex border-2 mx-60 mt-28 border-[#BBC8FC] justify-center items-center gap-10 rounded-2xl shadow-2xl">
//         <div>
//           <Animation />
//         </div>
//         <div>
//           <Login />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default LoginPage;
