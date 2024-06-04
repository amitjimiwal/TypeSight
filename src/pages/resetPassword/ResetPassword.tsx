import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useResetPassword from "@/hooks/useResetPassword";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const { resetPassword } = useResetPassword({ email });
  return (
    <div className="mx-auto max-w-md space-y-6 py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email below to reset your password.
        </p>
      </div>
      <form className="space-y-4" onSubmit={(e)=>{
          e.preventDefault();
          resetPassword();
      }}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required  onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </form>
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-medium underline underline-offset-4"
          >
            Login
          </Link>
        </p>
        <p>
          Don\'t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
