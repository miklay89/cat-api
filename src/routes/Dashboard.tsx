import { FC } from "react";
import PostComponent from "../components/post";

const DashboardPage: FC = () => {
  return (
    <div>
      <div style={{ margin: "0 auto" }}>
        <h2 style={{textAlign: "center"}}>Dashboard of cats</h2>
      </div>
      <div>
        <PostComponent />
      </div>
    </div>
  );
};

export default DashboardPage;
