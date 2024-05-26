import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import useOtp from "@/hooks/useOtp";

export default function Component() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const email = useRef<string>(params.get("email") || "");
  const { otp, setotp, resendOtp, submitOtp } = useOtp({
    verifyToken: params.get("redirect") || "",
    userEmail: email.current,
  });
  // const { status, user } = useAuthStatus();
  return (
    <div className="mx-auto space-y-6 max-w-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the verification code we sent to &nbsp;
          <strong>{email.current}</strong>
        </p>
      </div>
      <form className="space-y-2" onSubmit={submitOtp}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input disabled id="email" type="email" value={email.current} />
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
        <Button type="submit" className="w-full">
          Verify
        </Button>
      </form>
      <Button className="w-full" variant="outline" onClick={resendOtp}>
        Resend code
      </Button>
    </div>
  );
}
