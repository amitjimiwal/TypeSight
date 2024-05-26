import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "@/hooks/useAuthStatus";
interface Props {
  children: React.ReactNode;
  authentication: boolean;
}
const Protected = ({ children, authentication }: Props) => {
  const { status } = useAuthStatus();
  const navigate = useNavigate();
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    if (authentication && status != true) {
      navigate("/login");
    }
    if (!authentication && status === true) {
      navigate(-1);
    }
    setloading(false);
  }, [status, authentication, navigate]);
  return loading ? null : <>{children}</>;
};

export default Protected;
