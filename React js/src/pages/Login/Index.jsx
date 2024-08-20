import React, { useState } from 'react';
import { IMG } from '../../assets/Index';
import { useForm } from 'react-hook-form';
import authService from '../../service/auth.service';
import { useNavigate } from 'react-router-dom';
import { navigateToRoute } from '../../utils/helper';
import Input from '../../component/UI_Component/Input/Index';

const Login = () => {
    // Initialize navigation hook
    const navigate = useNavigate();
    // State to handle loading spinner
    const [isLoading, setIsLoading] = useState(false);

    // Initialize react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            setIsLoading(true); // Set loading state
            // Call login service to get OTP
            const sendOtp = await authService.login(data);
            const { status } = sendOtp;
            // If status is true, navigate to OTP page
            if (status === true) {
                navigateToRoute(navigate, "/OTP", true);
            }
        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error); // Log any errors
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row max-w-4xl p-6 rounded-lg">

                {/* Image section for larger screens */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center p-4">
                    <img src={IMG.EmailPic} alt='Login Illustration' />
                </div>

                <div className="w-full md:w-1/2 p-6 bg-white shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                    {/* Login form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-md p-2">
                                <svg className="h-8 w-8 text-gray-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {/* Name input field */}
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your Name"
                                    label="Name"
                                    register={register}
                                    error={errors?.name?.message}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email ID
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-md p-2">
                                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {/* Email input field */}
                                <Input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your Email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
                                            message: 'Please enter a valid email',
                                        },
                                    })}
                                    register={register}
                                    label="Email"
                                    patternValue={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g}
                                    patternMessage="Please enter a valid email"
                                />
                            </div>
                            <p style={{ color: "Red" }}>{errors?.email?.message}</p>
                        </div>

                        {/* Submit button */}
                        <button type='submit' className="w-full block text-center bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700">
                            <div className='flex justify-center'>
                                <div className='mx-2'>
                                    <span>Get OTP</span>
                                </div>
                                <div>
                                    {isLoading && <div className="w-6 h-6 rounded-full animate-spin border-4 border-dashed border-white border-t-transparent"></div>}
                                </div>
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;