import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="mx-auto space-y-6 max-w-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the verification code we sent to
          <strong>m@example.com</strong>
        </p>
      </div>
      <div className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input disabled id="email" type="email" value="m@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Verification code</Label>
          <Input id="code" placeholder="Enter your code" required />
        </div>
        <Button className="w-full">Verify</Button>
        <Button className="w-full" variant="outline">
          Resend code
        </Button>
      </div>
    </div>
  );
}
