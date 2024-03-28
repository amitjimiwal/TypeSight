import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomeScreen from './pages/Homepage/HomeScreen';
import SignupScreen from './pages/SignupScreen/SignupScreen';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import EmailVerification from './pages/EmailVerification/EmailVerification';
import Protected from './components/Protected';
import TypingTest from './pages/Typingtest/TypingTest';
import DashBoard from './pages/Dashboard/DashBoard';
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
  {
    path:'/test',
    element:<Protected authentication={true}><TypingTest/></Protected>
  },
  {
    path:'/dashboard/:id',
    element:<Protected authentication={true}><DashBoard/></Protected>
  }
]);
export default router;