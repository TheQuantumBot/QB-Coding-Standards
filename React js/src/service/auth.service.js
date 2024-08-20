import { apis } from "../congif/api.config"
import axiosClient from "../utils/httpClient"


//making particular module wise service file of API
class authservice {

    /** 
    *@param {*} data to send into the apis for verification
    *@returns otp to the client mail  
    */

    async login(data){
        try {
            return await axiosClient.post(apis.loginOtp,data)            
        } catch (error) {
            console.log("🚀 ~ authservice ~ login ~ error:", error)
        }
    }

     /** 
    *@param {*} data it's OTP to send to API for verifiaction
    *@returns data of user and verify user authentication
    */

    async verifyOtp(data){
        try {
            return await axiosClient.post(apis.verifyOtp,data)            
        } catch (error) {
            console.log("🚀 ~ authservice ~ login ~ error:", error)
        }
    }

}

export default authservice = new authservice()