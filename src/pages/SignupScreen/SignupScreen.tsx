import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const SignupScreen: React.FC = () => {
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
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your details below to create an account with TypeSight
            </p>
          </div>
          <div className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your username"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link className="ml-auto inline-block text-sm underline" to="#">
                  Forgot your password?
                </Link> */}
              </div>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Signup
            </Button>
            {/* <Button className="w-full" variant="outline">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link className="underline" to="/login">
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupScreen;
