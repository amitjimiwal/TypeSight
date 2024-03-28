import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux-store/store";
import { useNavigate } from "react-router-dom";
interface Props {
  children: React.ReactNode;
  authentication: boolean;
}
const Protected = ({ children, authentication }: Props) => {
  const authStatus = useSelector((state: AuthState) => state.auth.status);
  const isEmailVerified=true; //dummy value for test;
  const navigate = useNavigate();
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    if (authentication && authStatus != true) {
      navigate("/login");
    }
    if(authStatus && authentication && !isEmailVerified){
      navigate("/verify");
    }
    if(authStatus && authentication && isEmailVerified){
      navigate("/test");
    }
    if (!authentication && authStatus === true) {
      navigate("/test");
    }
    setloading(false);
  }, [authStatus, authentication, navigate,isEmailVerified]);
  return loading ? null : <>{children}</>;
};

export default Protected;