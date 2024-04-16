import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOtp from "@/hooks/useOtp";

export default function Component() {
  const navigate = useNavigate();
  const { otp, setotp, resendOtp, submitOtp } = useOtp();
  const { status, user } = useAuthStatus();
  useEffect(() => {
    if (status && user?.isEmailVerified) navigate(`/dashboard/${user.id}`);
    if(!status) navigate("/login");
  }, [status, navigate, user?.isEmailVerified,user?.id]);

  return (
    <div className="mx-auto space-y-6 max-w-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the verification code we sent to
          <strong>{status && user?.email}</strong>
        </p>
      </div>
      <form className="space-y-2" onSubmit={submitOtp}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input disabled id="email" type="email" value={user?.email || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Verification code</Label>
          <Input
            id="code"
            type="text"
            placeholder="Enter your code"
            required
            value={otp}
            onChange={(e) => setotp(e.target.value)}
          />
        </div>
        <Button className="w-full">Verify</Button>
      </form>
      <Button className="w-full" variant="outline" onClick={resendOtp}>
          Resend code
      </Button>
    </div>
  );
}
