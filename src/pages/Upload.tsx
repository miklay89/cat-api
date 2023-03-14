import { FC } from "react";
import Upload from "../components/upload/Upload";
import "./styles.css";

const UploadPage: FC = () => {
  return (
    <div>
      <div className="container">
        <h2 className="center">Upload page</h2>
        <div className="descr">
          <p>Chose photo or image of cat for uploading.</p>
          <p>
            If upload will be completed - you will be redirected to home page.
          </p>
          <p>In case of error of uploading you will be notified.</p>
          <div>
            <Upload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
