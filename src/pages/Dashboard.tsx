import { FC } from "react";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import PostComponent from "../components/card/Card";
import "./styles.css";

const DashboardPage: FC = () => {
  return (
    <div>
      <div className="container">
        <h2 className="center">Dashboard of cats</h2>
      </div>
      <div>
        <ErrorBoundary>
          <PostComponent hasError={false} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default DashboardPage;
