import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomeScreen from './pages/Homepage/HomeScreen';
import SignupScreen from './pages/SignupScreen/SignupScreen';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import EmailVerification from './pages/EmailVerification/EmailVerification';
import Protected from './components/Protected';
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
        element:<Protected authentication={false}><SignupScreen /></Protected>,
      },{
        path: "/login",
        element: <Protected authentication={false}><LoginScreen /></Protected>,
      },
      {
        path: "/verify",
        element: <Protected authentication={true}><EmailVerification /></Protected>,
      }
    ],
  },
]);
export default router;