import { FC, useEffect, useState } from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { useNavigate } from "react-router-dom";

const API_KEY =
  "live_etGJgtQvWmkQwtK2EbLA11QcEyr9mF1PXzQL6wLY3b6fcyicl22tqINcHTxR0Wnx";

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
      setTimeout(() => {navigate("/")}, 5000)
    }
  }, [status, navigate]);

  const hideError = () => {
    setStatus(undefined)
  }

  return (
    <div>
      <Uploady
        destination={{
          url: "https://api.thecatapi.com/v1/images/upload",
          headers: { "x-api-key": API_KEY },
        }}
        accept="image/*"
        isSuccessfulCall={customIsSuccess}
      >
        <UploadButton onClick={hideError} />
        <div
          style={{
            display: typeof status == "boolean" && !status ? "block" : "none",
            color: "red",
            textAlign: "center", marginTop: "30px"
          }}
        >
          Uploading error (something went wrong or image isn't a cat), please try again.
        </div>
        <div
          style={{
            display: typeof status == "boolean" && status ? "block" : "none",
            color: "green",
            textAlign: "center", marginTop: "30px"
          }}
        >
          Upload complete. You will be redirect to home page in 5 seconds.
        </div>
      </Uploady>
    </div>
  );
};

export default Upload;
