import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomeScreen from './pages/Homepage/HomeScreen';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
    ],
  },
]);
export default router;