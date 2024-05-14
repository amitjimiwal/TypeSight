import { SVGProps, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import SubscriptionButton from "./SubscriptionButton";

export default function Pricing() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  if (params.get("redirect") && params.get("redirect") === "billingportal") {
    return <Redirecting to="/" />;
  }
  if (params.get("success") == "true") {
    toast.success("Payment SuccessFul");
    return <Redirecting to="/test" />;
  }
  if (params.get("success") == "false") {
    toast.error("Payment Failed");
  }
  return (
    <section className="w-full py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center h-screen flex-col sm:flex-row">
      <h1 className="w-1/2 sm:text-3xl font-bold text-center p-4">
        TYPESIGHT comes with only one feature plan to give you the unlimited
        experience
      </h1>
      <div className="relative flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500 sm:w-1/3">
        <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Popular
        </div>
        <div>
          <h3 className="text-2xl font-bold text-center">Pro</h3>
          <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
            <span className="text-4xl font-bold">&#8377; 1000</span>/ month
          </div>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center dark:text-black">
              <CheckIcon className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1 " />
              Unlimited Test
            </li>
            <li className="flex items-center dark:text-black">
              <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
              Detailed Report of Wpm
            </li>
            <li className="flex items-center dark:text-black">
              <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
              Graphical Review of Accuracy and Wpm.
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <SubscriptionButton />
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

function Redirecting({ to = "/" }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    const id = setTimeout(() => {
      navigate(`${to}`);
    }, 2000);
    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <section className="w-full py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center h-screen flex-col sm:flex-row">
      <CheckIcon /> Redirecting{" "}
      <span className="animate-bounce text-xl font-extrabold">.</span>
      <span className="animate-bounce text-xl font-extrabold">.</span>
      <span className="animate-bounce text-xl font-extrabold">.</span>
      <span className="animate-bounce text-xl font-extrabold">.</span>
    </section>
  );
}
