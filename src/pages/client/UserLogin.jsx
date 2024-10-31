/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import authApi from "@/api/authentication";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";


function UserLogin() {
  const {login}=useAuth()
  const navigate=useNavigate()
  const [isOTPScreen, setIsOTPScreen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill("")); 

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (validatePhoneNumber(phoneNumber)) {
      authApi
        .sendOtp(phoneNumber)
        .then((resp) => {
          setIsOTPScreen(true);
          toast.success(`OTP sent successfully. Your OTP is ${resp.data.otp}`);
        })
        .catch((error) => {
          toast.error(error.message || "Failed to send OTP");
        });
    } else {
      toast.error("Please Enter valid phone number!");
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join(""); // Join OTP array into a single string
    console.log(otpCode);

    authApi
      .verifyOtp(phoneNumber, otpCode)
      .then((resp) => {
        toast.success("Login successful!");
        const token=resp.data.access_token;
        login(null, token);
        navigate("/")
      })
      .catch((error) => {
        toast.error("Invalid OTP. Please try again.");
        setOtp([])
      });
  };

  const handleOTPChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input automatically if a number is entered
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
    
      <div className="w-[30%] h-[200px] shadow-xl rounded-xl p-3">
        <p className="text-center text-[30px] font-semibold">RoadSide</p>
        <p className="text-center">Welcome Back!</p>

        {!isOTPScreen ? (
          <form className="mt-5 flex gap-1 " onSubmit={handlePhoneSubmit}>
            <input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              className="border border-gray-300 p-2 rounded-md text-[15px] w-full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button className="">Send OTP</Button>
          </form>
        ) : (
          <form
            className="w-full flex justify-center items-center mt-4 flex-col  "
            onSubmit={handleOTPSubmit}
          >
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  className="h-10 text-center border  rounded-md w-full"
                  value={otp[index]}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                />
              ))}
            </div>
            <Button className="mt-2 ">Login</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
