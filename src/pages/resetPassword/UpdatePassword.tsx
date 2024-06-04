import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import NotFound from "../404/NotFound";
import {  useRef } from "react";
import useResetPassword from "@/hooks/useResetPassword";
import toast from "react-hot-toast";
export default function UpdatePassword() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const email = useRef<string>(params.get("email") || "");
  const { updatePassword } = useResetPassword({
    email: email.current,
    token: params.get("token") || "",
  });
  if (!params.get("email") || !params.get("token")) return <NotFound />;
  return (
    <div className="mx-auto max-w-md space-y-6 mt-20">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter a new password for {email.current}
        </p>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (passwordRef.current && confirmPasswordRef.current && passwordRef.current.value === confirmPasswordRef.current.value){
            updatePassword(
              passwordRef.current.value
            );
          } else toast.error("Passwords do not match");
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            required
            ref={passwordRef}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            required
            ref={confirmPasswordRef}
          />
        </div>
        <Button type="submit" className="w-full">
          Update Password
        </Button>
      </form>
    </div>
  );
}
