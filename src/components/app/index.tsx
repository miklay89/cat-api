import React, { FC } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Error from "../error";
import HomePage from "../../routes/Home";
import UploadPage from "../../routes/Upload";
import DashboardPage from "../../routes/Dashboard";
import Navbar from "../navbar";

const AppLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "upload",
        element: <UploadPage />,
      },
    ],
  },
]);

const App: FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
