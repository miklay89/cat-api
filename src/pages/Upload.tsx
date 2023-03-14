import { FC } from "react";
import UploadyComponent from "../components/upload";

const UploadPage: FC = () => {
  return (
    <div>
      <div style={{ margin: "0 auto", maxWidth: "900px" }}>
        <h2 style={{ textAlign: "center" }}>Upload page</h2>
        <div style={{ padding: "10px" }}>
          <p>Chose photo or image of cat for uploading.</p>
          <p>
            If upload will be completed - you will be redirected to home page.
          </p>
          <p>In case of error of uploading you will be notified.</p>
          <div>
            <UploadyComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
