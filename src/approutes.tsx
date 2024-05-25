import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Suspense, lazy } from "react";
import HomeScreen from "./pages/Homepage/HomeScreen";
import SignupScreen from "./pages/SignupScreen/SignupScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import EmailVerification from "./pages/EmailVerification/EmailVerification";
import Protected from "./components/Protected";
const TypingTest = lazy(() => import("./pages/Typingtest/TypingTest"));
const DashBoard = lazy(() => import("./pages/Dashboard/DashBoard"));
import GettingStarted from "./pages/GettingStarted/GettingStarted";
import Pricing from "./components/Pricing";
import NotFound from "./pages/404/NotFound";
import PageLoading from "./components/PageLoading";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignupScreen />
          </Protected>
        ),
      },
      {
        path: "getting-started",
        element: <GettingStarted />,
        children: [
          {
            path: "/getting-started/:id",
          },
        ],
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <LoginScreen />
          </Protected>
        ),
      },
      {
        path: "/verify",
        element: (
            <EmailVerification />
        ),
      },
    ],
  },
  {
    path: "/test",
    element: (
      <Suspense fallback={<PageLoading />}>
        <Protected authentication={true}>
          <TypingTest />
        </Protected>
      </Suspense>
    ),
  },
  {
    path: "/dashboard/:id",
    element: (
      <Suspense fallback={<PageLoading />}>
      <Protected authentication={true}>
        <DashBoard />
      </Protected>
    </Suspense>
    ),
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
