import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeScreen from "./pages/Homepage/HomeScreen";
import SignupScreen from "./pages/SignupScreen/SignupScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import EmailVerification from "./pages/EmailVerification/EmailVerification";
import Protected from "./components/Protected";
import TypingTest from "./pages/Typingtest/TypingTest";
import DashBoard from "./pages/Dashboard/DashBoard";
import GettingStarted from "./pages/GettingStarted/GettingStarted";
import Pricing from "./components/Pricing";
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
          <Protected authentication={true}>
            <EmailVerification />
          </Protected>
        ),
      },
    ],
  },
  {
    path: "/test",
    element: (
      <Protected authentication={true}>
        <TypingTest />
      </Protected>
    ),
  },
  {
    path: "/dashboard/:id",
    element: (
      <Protected authentication={true}>
        <DashBoard />
      </Protected>
    ),
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
]);
export default router;
