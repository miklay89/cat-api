import React, { FC, useEffect, useState } from "react";
import { Favorite } from "../../interfaces/interfaces";
import API from "../../services/api";

interface Props {
  imageId: string;
  favorites: Favorite[];
}

const Favourite: FC<Props> = (props: Props) => {
  const [favId, setFavId] = useState<number>(0);
  const [status, setStatus] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    function checkStatus() {
      if(!props.favorites.length) return;
      const [favorite] = props.favorites.filter(
        (f) => f.image_id === props.imageId
      );
      if (!favorite) {
        setStatus(false);
      } else {
        setStatus(true);
        setFavId(favorite.id);
      }
    }
    if (typeof status === "undefined") checkStatus();
  }, [props.favorites, props.imageId, status]);

  const setFavHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus(true);
    const res = await API.setFavourite(props.imageId);
    setFavId(res.id);
  };

  const deleteFavHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus(false);
    API.deleteFavourite(favId);
  };

  return (
    <div>
      <button
        id={String(favId)}
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
        id={props.imageId}
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

export default Favourite;
