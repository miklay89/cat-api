import { FC, useEffect, useState } from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;


const Upload: FC = () => {
  // redirect if OK
  const navigate = useNavigate();
  // status of upload
  const [status, setStatus] = useState<boolean | undefined>(undefined);
  // update status
  const customIsSuccess = (xhr: { status: number }) => {
    if ([200, 201].includes(xhr.status)) {
      // upload OK
      setStatus(true);
      return true;
    }
    // upload false
    setStatus(false);
    return false;
  };

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [status, navigate]);

  const hideErrorMessage = () => {
    setStatus(undefined);
  };

  return (
    <div>
      <Uploady
        destination={{
          url: `${baseUrl}/images/upload`,
          headers: { "x-api-key": API_KEY },
        }}
        accept="image/*"
        isSuccessfulCall={customIsSuccess}
      >
        <UploadButton className="upload_btn" onClick={hideErrorMessage} />
        <div
          className={
            typeof status === "boolean" && !status
              ? "show fail center"
              : "hidden"
          }
        >
          Uploading error (something went wrong or image isn't a cat), please
          try again.
        </div>
        <div
          className={
            typeof status === "boolean" && status
              ? "show success center"
              : "hidden"
          }
        >
          Upload complete. You will be redirect to home page in 5 seconds.
        </div>
      </Uploady>
    </div>
  );
};

export default Upload;
