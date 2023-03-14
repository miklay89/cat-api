import { FC } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import "./styles.css";

const NoPage: FC = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="container center">
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <div className="container center">Oops</div>;
  }
};

export default NoPage;