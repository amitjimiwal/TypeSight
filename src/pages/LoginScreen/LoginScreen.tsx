import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { LoginData } from "@/types";
import { loginUser } from "@/redux-store/slices/authSlice";
import useAppDispatch from "@/hooks/useAppDispatch";
import { unwrapResult } from "@reduxjs/toolkit";

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>();
  const submitHandler = function (data: LoginData) {
    if (import.meta.env.VITE_APP_ENV === "development") console.log(data);
    dispatch(loginUser(data))
      .then(unwrapResult)
      .then(({ data }) => {
        if(data.statusCode==403 || !data.data.isEmailVerified ) navigate("/verify");
        else navigate(`/dashboard/${data.data.id}`);
      })
  };
  return (
    <div className="flex flex-col min-h-screen items-stretch">
      <header className="p-4 flex items-center">
        <div className="mx-auto flex items-center space-x-2">
          <div className="font-semibold text-3xl">TypeSight</div>
        </div>
      </header>
      <main className="flex-1 space-y-4 px-4 flex justify-center mt-20">
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to login to your account
            </p>
            <p className="text-green-500 dark:text-red-400 text-sm">
              Please enter your valid email as you need to verify yourself with
              that email
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red">{errors.email.message}</span>
              )}
            </div>
            <div className="space-y-2 relative">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link className="ml-auto inline-block text-sm underline" to="#">
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id="password"
                required
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red">{errors.password.message}</span>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-4 right-0 bg-gray-200"
                onClick={() => {
                  setshowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <EyeIcon className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
            {/* <Button className="w-full" variant="outline">
              Login with Google
            </Button> */}
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link className="underline" to="/signup">
              Sign up
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Forgot Password?
            <Link className="underline" to="/forgot-password">
              Reset
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginScreen;
