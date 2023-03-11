import React, { FC, useState } from "react";
import API from "../../services/api";

interface Props {
  fav_id: string;
  isFav: boolean;
  img_id: string;
}

const FavButtonComponent: FC<Props> = (props: Props) => {
  const [status, setStatus] = useState<boolean>(props.isFav);
  const [favId, setFavId] = useState<string>(props.fav_id);
  const [imgId, setImgId] = useState<string>(props.img_id);

  const setFavHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await API.setFavourite(imgId);
    setFavId(res.id);
    setStatus(true);
  };

  const deleteFavHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    API.deleteFavourite(favId);
    setStatus(false);
  };

  return (
    <div>
      <button
        id={favId}
        onClick={deleteFavHandler}
        style={{
          width: "100%",
          borderRadius: "10px",
          padding: "3px",
          display: status ? "block" : "none",
          backgroundColor: "#db7d7d",
        }}
      >
        Delete from favourite
      </button>
      <button
        id={imgId}
        onClick={setFavHandler}
        style={{
          width: "100%",
          borderRadius: "10px",
          padding: "3px",
          display: status ? "none" : "block",
          backgroundColor: "#7ddb8a",
        }}
      >
        Add to favourite
      </button>
    </div>
  );
};

export default FavButtonComponent;
