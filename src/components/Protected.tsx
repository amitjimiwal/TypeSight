import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "@/hooks/useAuthStatus";
interface Props {
  children: React.ReactNode;
  authentication: boolean;
}
const Protected = ({ children, authentication }: Props) => {
  const { status, user } = useAuthStatus();
  const navigate = useNavigate();
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    if (authentication && status != true) {
      navigate("/login");
    }
    if (!authentication && status === true) {
      navigate(-1);
    }
    if (status && authentication) {
      if (!user?.isEmailVerified) navigate("/verify");
    }
    setloading(false);
  }, [status, authentication, navigate,user?.isEmailVerified]);
  return loading ? null : <>{children}</>;
};

export default Protected;
