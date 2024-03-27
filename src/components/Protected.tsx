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
  const navigate = useNavigate();
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    if (authentication && authStatus != true) {
      navigate("/login");
    }
    if (!authentication && authStatus === true) {
      navigate("/");
    }
    setloading(false);
  }, [authStatus, authentication, navigate]);
  return loading ? null : <>{children}</>;
};

export default Protected;