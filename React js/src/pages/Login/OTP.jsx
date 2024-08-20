import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import authService from '../../service/auth.service';
import Lottie from 'lottie-react';
import animationData from "../../utils/OTP.json";
import { navigateToRoute } from '../../utils/helper';

const OTP = () => {
    const navigate = useNavigate(); // Initialize navigation hook
    const [isLoading, setIsLoading] = useState(false); // State for handling loading spinner

    // Initialize react-hook-form with default values
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            otp: ''
        }
    });

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            setIsLoading(true); // Set loading state
            // Call the verifyOtp API to validate the OTP
            const verifyOtp = await authService.verifyOtp(data.otp);
            const { status } = verifyOtp;
            if (status === true) {
                // If successful, navigate to the home page
                navigateToRoute(navigate, "/home", true);
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

                {/* Lottie animation for larger screens */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center p-4">
                    <Lottie
                        animationData={animationData}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>

                <div className="w-full md:w-1/2 p-6 bg-white shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">OTP Verification</h2>

                    {/* OTP form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="otp">
                                OTP
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-md p-2">
                                {/* OTP input field with styling */}
                                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v2m-6 4a9 9 0 1112 0M12 7h.01" />
                                </svg>
                                <Controller
                                    name="otp"
                                    control={control}
                                    render={({ field }) => (
                                        <OtpInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            numInputs={4}
                                            renderSeparator={<span>-</span>}
                                            renderInput={(props) => <input {...props} />}
                                            inputStyle={{ width: '3rem', height: '3rem', margin: '0 0.5rem', fontSize: '1.5rem', textAlign: 'center', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                                        />
                                    )}
                                />
                            </div>
                            {/* Display OTP validation error message */}
                            <p style={{ color: "Red" }}>{errors?.otp?.message}</p>
                        </div>
                        {/* Submit button with loading spinner */}
                        <button type='submit' className="w-full block text-center bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700" disabled={isLoading}>
                            <div className='flex justify-center'>
                                <div className='mx-2'>
                                    <span>Login</span>
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

export default OTP;
