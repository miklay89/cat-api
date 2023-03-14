import { FC } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import DashboardPage from "../pages/Dashboard";
import HomePage from "../pages/Home";
import NoPage from "../pages/NoPage";
import UploadPage from "../pages/Upload";

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
    errorElement: <NoPage />,
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

export default router;
