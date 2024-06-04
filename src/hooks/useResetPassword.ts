type Reset = {
     email: string;
     token?: string;
}
import { axiosClient } from "@/api/axiosclient";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const useResetPassword = ({ email, token }: Reset) => {
     const navigate = useNavigate();
     if (token) axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     const resetPassword = useCallback(() => {
          axiosClient.post(`/auth/reset/${email}`).then(({ data }) => {
               toast.success(data.message);
               navigate(-1);
          }).catch(err => {
               if (import.meta.env.VITE_APP_ENV === 'development') console.log(err);
               toast.error(err.response.data.message);
          })
     }, [email]);
     const updatePassword = useCallback((password: string) => {
          axiosClient.post(`/auth/update/password`, {
               password,
               email
          }).then(({ data }) => {
               toast.success(data.message);
               navigate("/login");
          }).catch(err => {
               if (import.meta.env.VITE_APP_ENV === 'development') console.log(err);
               toast.error(err.response.data.message);
               navigate("/forgot-password");
          })
     }, [email]);
     return { resetPassword, updatePassword };
}
export default useResetPassword;