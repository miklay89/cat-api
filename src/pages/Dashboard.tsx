import { FC } from "react";
import ErrorBoundary from "../components/error";
import PostComponent from "../components/post";

const DashboardPage: FC = () => {
  return (
    <div>
      <div style={{ margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Dashboard of cats</h2>
      </div>
      <div>
        <ErrorBoundary >
          <PostComponent hasError={false} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default DashboardPage;
