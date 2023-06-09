import React, { FC, useEffect, useState } from "react";
import { Favorite } from "../../../interfaces/interfaces";
import API from "../../../services/api";
import "./style.css";

interface Props {
  imageId: string;
  favorites: Favorite[];
}

const Favourite: FC<Props> = (props: Props) => {
  const [favorite] = props.favorites.filter(
    (f) => f.image_id === props.imageId
  );

  const [favId, setFavId] = useState<number>(favorite ? favorite.id : 0);
  const [status, setStatus] = useState<boolean>(favorite ? true : false);

  const setFavHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus(true);
    API.setFavourite(props.imageId).then((res) => setFavId(res.id));
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
        className={status ? "unfav_btn show" : "hidden"}
      >
        Delete from favourite
      </button>
      <button
        id={props.imageId}
        onClick={setFavHandler}
        className={!status ? "fav_btn show" : "hidden"}
      >
        Add to favourite
      </button>
    </div>
  );
};

export default Favourite;
