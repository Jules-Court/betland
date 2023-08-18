import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage';
import ErrorPage from "./ErrorPage";
import App from './App'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const routerLogin = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: '/',
    element : <App/>,
    errorElement: <ErrorPage />,
  }

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerLogin} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
