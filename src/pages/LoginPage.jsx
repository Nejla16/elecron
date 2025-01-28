import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
import UserService from "../services/useService";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { logedUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const dispatch = useDispatch();
    const navigation = useNavigate();

    //formik
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('You must provide a username..'),
            password: Yup.string().required('You must provide a password..')
        }),
        //validation
        onSubmit: (values) => {
            UserService.logdIn({... values, expiresInMins: 120})
            .then(res => {
                if(res.status === 200){
                    toast.success('User successfully loged in!')
                    //res.data; je jedan user!
                    dispatch(logedUser(res.data));
                    setTimeout(() => navigation('/'), 2000);
                }else{
                    toast.error('Invalid username or password'); //ako pogrijesis username ili password izbaci gresku (gresku izbaci u console jer radimo preko dummyjson-a)
                }
            })
            .catch(err => {
                toast.error(err.response.data.message);
            })

            formik.resetForm();
        }
    })

    const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
  <div>
    <h2 className="text-center my-[30px] text-mainBlue font-bold uppercase text-3xl">Login Form</h2>

    <form onSubmit={formik.handleSubmit} className="border-2 border-mainYellow w-[50%] mx-auto p-[20px] rounded-3xl flex flex-col items-center justify-center gap-5">
        {/* Username */}
        <div className="flex flex-col">
        <label className="text-grayText text-[15px]">Username
        <span className="text-[13px] text-mainYellow ml-[5px]">{showError('username')}</span>
        </label>
        <input 
        type="text" 
        placeholder="Insert username"
        className="border border-mainBlue rounded-md px-[16px] py-[8px]" 
        onChange={formik.handleChange}
        name='username'
        value={formik.values.username}
        />
        </div>

        {/* Password */}
        <div className="flex flex-col">
        <label className="text-grayText text-[15px]">Password
        <span className="text-[13px] text-mainYellow ml-[5px]">{showError('password')}</span>
        </label>
        <input 
        type="password" 
        placeholder="Insert password" 
        className="border border-mainBlue rounded-md px-[16px] py-[8px]"
        onChange={formik.handleChange}
        name='password'
        value={formik.values.password}
        />
        </div>

        <button type="submit" className="bg-mainYellow text-[#fff] px-[35px] py-[8px] rounded-2xl">Login</button>
    </form>

  </div>
);
}

export default LoginPage;
