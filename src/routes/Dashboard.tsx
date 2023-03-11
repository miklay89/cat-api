import { FC } from "react";
import ImageComponent from "../components/Image/Image";

const DashboardPage: FC = () => {
  return (
    <div>
      <div style={{ margin: "0 auto" }}>
        <h2 style={{textAlign: "center"}}>Dashboard of cats</h2>
      </div>
      <div>
        <ImageComponent />
      </div>
    </div>
  );
};

export default DashboardPage;
