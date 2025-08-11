import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RegisterPage from './pages/register';
import User from './pages/User.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "user",
          element: <User />
        },
        {
          path: "login",
          element: <Login />
        }
    ]
  },
  {
    path: "register",
    element: <RegisterPage />
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />,
  </StrictMode>,
)
