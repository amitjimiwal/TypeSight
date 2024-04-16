import { useCallback, useState } from "react";
import { useAuthStatus } from "./useAuthStatus";
import { axiosClient } from "@/api/axiosclient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const useOtp = () => {
     const navigate = useNavigate();
     const [otp, setotp] = useState<string>("");
     const { user } = useAuthStatus();
     const submitOtp = useCallback(function (): void {
          if (isNaN(Number(otp))) {
               toast.error("Enter Valid Number Otp");
               return;
          }
          axiosClient
               .patch(`/auth/verify/${Number(otp)}/${user?.email}`)
               .then(({ data }) => {
                    if (data.success) {
                         toast.success(data.message);
                         navigate("/pricing")
                    } else toast.error(data.message);
                    setotp("");
               }).catch((err): void => {
                    if (import.meta.env.VITE_APP_ENV === 'development') console.log(err)
                    toast.error(err.message);
               });
     }, [otp, user?.email, navigate]);
     const resendOtp = useCallback(function (): void {
          axiosClient
               .patch(`/auth/resendotp/${user?.email}`)
               .then(({ data }) => {
                    if (data.success) {
                         toast.success(data.message);
                    } else toast.error(data.message);
                    setotp("");
               }).catch((err): void => {
                    if (import.meta.env.VITE_APP_ENV === 'development') console.log(err)
                    toast.error(err.message);
               });
     }, [user?.email])
     return { otp, setotp, submitOtp, resendOtp }
}

export default useOtp
