"use client"
import React from 'react'
import {useForm,SubmitHandler} from "react-hook-form";
import { api } from '../query-provider'; 



type TRegister={
    username:string;
    email:string;
    password:string;
}

export const Register = () => {
    const registerData=api.auth.RegisterUser.useMutation()
const {register,handleSubmit,formState:{errors}}=useForm<TRegister>()

const formSubmit:SubmitHandler<TRegister>=async(data)=>{
    await registerData.mutateAsync({
        body:{
            user_name:data.username,
            email:data.email,
            password:data.password
        }
    
    },
    {onSuccess:()=>{
        alert("Register Successfull")
    }}
)
}



  return (
    
    <div className='w-full h-screen flex justify-center items-center '>
   <form className="w-[30%] flex flex-col gap-4 border p-10 " 
   onSubmit={handleSubmit(formSubmit)}
   >
      <label ><span className='text-sm my-4' >Userame</span>
      <input {...register("username")}  className='w-full border border-[#ececf2] p-2 rounded text-xs '/>
      </label>
    <label><span>Email</span>
    <input {...register("email")}/>
    </label>
    <label><span>Password</span>
    <input {...register("password")}/>
    </label>
     <button>submit</button>
    </form>
   </div>
  )
}
