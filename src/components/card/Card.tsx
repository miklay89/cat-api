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
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<Image[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [hasError, setHasError] = useState<boolean>(props.hasError);

  useEffect(() => {
    API.getImages(0)
      .then((res) => {
        setLoading(false);
        setImages(res);
      })
      .catch(() => setHasError(true));
  }, []);

  useEffect(() => {
    API.getFavourites()
      .then((res) => setFavorites(res))
      .catch(() => setHasError(true));
  }, []);

  useEffect(() => {
    API.getVotes()
      .then((res) => setVotes(res))
      .catch(() => setHasError(true));
  }, []);

  const clickHandler = async (e: MouseEvent) => {
    e.preventDefault();
    API.getImages(images.length / 6)
      .then((res) => setImages([...images, ...res]))
      .catch(() => setHasError(true));
  };

  if (hasError) {
    return <div className="message center">Server error...</div>;
  }

  const items = images.map((image) => {
    return (
      <div key={image.id} className="img_container">
        <div className="center">Cat...</div>
        <div>
          <img className="photo" src={image.url} alt={image.id} />
        </div>
        <FavouriteButton imageId={image.id} favorites={favorites} />
        <VoteComponent imageId={image.id} votes={votes} />
      </div>
    );
  });

  return (
    <>
      <div className="dashboard_container">
        <div className={loading ? "show message center" : "hidden"}>
          Loading...
        </div>
        <div
          className={
            !loading && images.length === 0 ? "show message center" : "hidden"
          }
        >
          No cats yet...
        </div>
        {items}
      </div>
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
