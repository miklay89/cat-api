import React, { FC } from "react";
import { RouterProvider } from "react-router-dom";
import router from "../../routes/root";

const App: FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
