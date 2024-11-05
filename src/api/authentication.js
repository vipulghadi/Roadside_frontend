
import axios from 'axios';
import { API_BASE_URL,ACCESS_TOKEN } from '.';


const authApi = {
  sendOtp: async ( phoneNumber ) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/client/auth/otp-login/?contact_number=${phoneNumber}`);
      return response.data; 
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },

  verifyOtp: async ( phoneNumber, otp ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/client/auth/otp-login/`, {
        contact_number: phoneNumber,
        otp: otp,
       });
       
      return response.data;

    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },
  
  getCurrentUser: async (access_token)=>{
     try{
        const response = await axios.get(`${API_BASE_URL}/client/auth/get-current-user/`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        return response.data;
     }
     catch (e) {
        console.error('Error getting current user:', e);
        throw e;
     }
  },
  
  createVendorAccount:async(data)=>{
    try{
      const response = await axios.post(`${API_BASE_URL}/client/vendor/vendor-registration/`, data);
      return response.data;
    }
    catch (e) {
      console.error('Error creating vendor account:', e);
      throw e;
    }
  }
};


export default authApi;
