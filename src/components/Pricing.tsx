import { Button } from "@/components/ui/button";
import { SVGProps } from "react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section className="w-full py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center h-screen">
      <h1 className="w-1/2 text-3xl font-bold text-center p-4">TYPESIGHT comes with only onew feature plan to give you the unlimited experience</h1>
      <div className="relative flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500 w-1/3">
        <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Popular
        </div>
        <div>
          <h3 className="text-2xl font-bold text-center">Pro</h3>
          <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
            <span className="text-4xl font-bold">$59</span>/ month
          </div>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center dark:text-black">
              <CheckIcon className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1 " />
              100 daily Limit
            </li>
            <li className="flex items-center dark:text-black">
              <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
              Unlimited Usage
            </li>
            <li className="flex items-center dark:text-black">
              <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
              24/7 Support
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <Button
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
            onClick={() => {
              navigate("/test");
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
