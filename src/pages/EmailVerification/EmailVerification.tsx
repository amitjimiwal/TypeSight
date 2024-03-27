import { useAuthStatus } from "@/hooks/useAuthStatus";

const EmailVerification = () => {
  const [authStatus] = useAuthStatus();
  return <div>EmailVerification for {authStatus ? "Verified User" : ""}</div>;
};

export default EmailVerification;
