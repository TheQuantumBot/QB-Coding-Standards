export const BASE_URL = process.env.REACT_APP_BASE_URL;

// apis list
export const apis = {
    loginOtp:`${BASE_URL}/api/send-otp`,
    verifyOtp:`${BASE_URL}/api/verify-otp`
}
