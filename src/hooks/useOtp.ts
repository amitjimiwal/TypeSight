import { FormEvent, useCallback, useState } from "react";
import { axiosClient } from "@/api/axiosclient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
type Otp={
     verifyToken:string;
     userEmail:string;
}
const useOtp = ({verifyToken,userEmail}:Otp) => {
     axiosClient.defaults.headers.common['Authorization'] = `Bearer ${verifyToken}`
     const navigate = useNavigate();
     const [otp, setotp] = useState<string>("");
     const submitOtp = useCallback(function (e: FormEvent): void {
          e.preventDefault();
          if (isNaN(Number(otp))) {
               toast.error("Enter Valid Number Otp");
               return;
          }
          axiosClient
               .patch(`/auth/verify/${Number(otp)}/${userEmail}`)
               .then(({ data }) => {
                    if (data.success) {
                         toast.success(data.message);
                         navigate(`/dashboard/${data.data.id}`);
                    } else toast.error(data.message);
                    setotp("");
               }).catch((err): void => {
                    if (import.meta.env.VITE_APP_ENV === 'development') console.log(err)
                    toast.error(err.response.data.message);
               });
     }, [otp, userEmail, verifyToken]);
     const resendOtp = useCallback(function (): void {
          axiosClient
               .patch(`/auth/resendotp/${userEmail}`)
               .then(({ data }) => {
                    if (data.success) {
                         toast.success(data.message);
                    } else toast.error(data.message);
                    setotp("");
               }).catch((err): void => {
                    if (import.meta.env.VITE_APP_ENV === 'development') console.log(err)
                    toast.error(err.message);
               });
     }, [userEmail])
     return { otp, setotp, submitOtp, resendOtp }
}

export default useOtp
