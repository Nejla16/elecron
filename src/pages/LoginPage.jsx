import { useFormik } from "formik";
import React from "react";

function LoginPage() {

    //formik
    const formik = useFormik({
        initialValues: {

        },
        //validation
        onSubmit: (values) => {
            console.log(values);
        }
    })

  return (
  <div>
    <h2 className="text-center my-[30px] text-mainBlue font-bold uppercase text-3xl">Login Form</h2>

    <form onSubmit={formik.handleSubmit} className="border-2 border-mainYellow w-[50%] mx-auto p-[20px] rounded-3xl flex flex-col items-center justify-center gap-5">
        {/* Username */}
        <div className="flex flex-col">
        <label className="text-grayText text-[15px]">Username</label>
        <input 
        type="text" 
        placeholder="Insert username"
        className="border border-mainBlue rounded-md px-[16px] py-[8px]" 
        />
        </div>

        {/* Password */}
        <div className="flex flex-col">
        <label className="text-grayText text-[15px]">Password</label>
        <input 
        type="password" 
        placeholder="Insert password" 
        className="border border-mainBlue rounded-md px-[16px] py-[8px]"
        />
        </div>

        <button type="submit" className="bg-mainYellow text-[#fff] px-[35px] py-[8px] rounded-2xl">Login</button>
    </form>

  </div>
);
}

export default LoginPage;
