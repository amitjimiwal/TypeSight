import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "/logo.png";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
} from "@/components/ui/card";
import { SVGProps, useEffect, useState } from "react";
import { useAuthStatus, useResultStatus } from "@/hooks/useAuthStatus";
import useAppDispatch from "@/hooks/useAppDispatch";
import { getResultsInfo } from "@/redux-store/slices/resultslice";
import { logoutUser } from "@/redux-store/slices/authSlice";
import { calculateAverage } from "@/lib/helpers/calculateUserAverage";
import ChartView from "@/components/ChartView";
import { ModeToggle } from "@/components/ui/toggle-theme";

export default function Component() {
  const dispatch = useAppDispatch();
  const { user } = useAuthStatus();
  const { results } = useResultStatus();
  const [averagedata, setAverageData] = useState({
    averageScore: 0,
    averageAccuracy: 0,
  });
  useEffect(() => {
    if (user?.id) {
      dispatch(getResultsInfo(String(user?.id)));
    }
    if (results) {
      const res = calculateAverage(results);
      setAverageData(res);
    }
  }, [results, user?.id, dispatch]);
  return (
    <div className="flex h-screen w-full flex-col p-0">
      <div className="flex h-full flex-row">
        <div className="flex flex-col flex-1">
          <header className="h-16 px-4 border-b shrink-0 md:px-6 flex items-center">
            <div className="flex items-center justify-end w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <ModeToggle />
              <Button
                className="rounded-full w-8 h-8"
                size="icon"
                variant="ghost"
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                <LogOutIcon className="w-4 h-4" />
                <span className="sr-only">Log out</span>
              </Button>
              <Link className="flex items-center gap-2 text-sm" to="/">
                <Button className="rounded-full" size="icon" variant="ghost">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src={logo}
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </Link>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <h1 className="text-xl font-bold text-black dark:text-white">
              Welcome, {user?.name}
            </h1>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Average score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">
                    {averagedata.averageScore}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Average Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-700">
                    {averagedata.averageAccuracy.toFixed(2)}%
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium">
                    Score Overview
                  </CardTitle>
                  <CardDescription>
                    Your score's Variations in the typing test
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  {/* Chart Component Here */}
                  <ChartView type="Score" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium">
                    Accuracy Overview
                  </CardTitle>
                  <CardDescription>
                    Your accuracy Variations in the typing test
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  {/* Chart Component Here */}
                  <ChartView type="Accuracy" />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function LogOutIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

// function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   );
// }
