import { FC, useEffect, useState, MouseEvent } from "react";
import { Favorite, Image, Vote } from "../../interfaces/interfaces";
import API from "../../services/api";
import FavouriteButton from "./favouriteBtn/FavouriteBtn";
import VoteComponent from "./voteBtn/VoteBtn";
import "./styles.css";

interface Props {
  hasError: boolean;
}

const Post: FC<Props> = (props) => {
  const [images, setImages] = useState<Image[] | undefined>(undefined);
  const [favorites, setFavorites] = useState<Favorite[] | undefined>(undefined);
  const [votes, setVotes] = useState<Vote[] | undefined>(undefined);
  const [hasError, setHasError] = useState<boolean>(props.hasError);

  useEffect(() => {
    async function getImages() {
      const imagesData = await API.getImages(0);
      if (imagesData) return setImages(imagesData);
      return setHasError(true);
    }
    if (!images) getImages();
  }, [images]);

  useEffect(() => {
    async function getFavourites() {
      const favouriteData = await API.getFavourites();
      if (favouriteData) return setFavorites(favouriteData);
      return setHasError(true);
    }
    if (!favorites) getFavourites();
  }, [favorites]);

  useEffect(() => {
    async function getVotes() {
      const votesData = await API.getVotes();
      if (votesData) return setVotes(votesData);
      return setHasError(true);
    }
    if (!votes) getVotes();
  }, [votes]);

  const clickHandler = async (e: MouseEvent) => {
    e.preventDefault();
    if (!images) return;
    const imagesData = await API.getImages(images.length / 6);
    if (imagesData) setImages([...images, ...imagesData]);
  };

  if (hasError) {
    return <div className="message center">Server error...</div>;
  }

  if (!images) {
    return <div className="message center">Loading...</div>;
  }

  if (images.length === 0) {
    return <div className="message center">No cats yet...</div>;
  }

  const items = images.map((image) => {
    return (
      <div key={image.id} className="img_container">
        <div className="center">Cat...</div>
        <div>
          <img className="photo" src={image.url} alt={image.id} />
        </div>
        <FavouriteButton imageId={image.id} favorites={favorites || []} />
        <VoteComponent imageId={image.id} votes={votes || []} />
      </div>
    );
  });

  return (
    <>
      <div className="dashboard_container">{items}</div>
      <div className="footer">
        <button
          onClick={clickHandler}
          className={images.length ? "show get_more_btn" : "hidden"}
        >
          Get more cats!
        </button>
      </div>
    </>
  );
};

export default Post;
