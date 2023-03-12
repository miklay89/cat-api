import { FC, useEffect, useState, MouseEvent } from "react";
import { Favorite, Image, Vote } from "../../interfaces/interfaces";
import API from "../../services/api";
import FavouriteButton from "../favourite";
import VoteComponent from "../vote";

const Post: FC = () => {
  const [images, setImages] = useState<Image[] | undefined>(undefined);
  const [favorites, setFavorites] = useState<Favorite[] | undefined>(undefined);
  const [votes, setVotes] = useState<Vote[] | undefined>(undefined);

  useEffect(() => {
    async function getImages() {
      const imagesData = await API.getImages(0);
      setImages([...(images || []), ...imagesData]);
    }
    if (!images) getImages();
  }, [images]);

  useEffect(() => {
    async function getFavourites() {
      const favouriteData = await API.getFavourites();
      setFavorites(favouriteData);
    }
    if (!favorites) getFavourites();
  }, [favorites]);

  useEffect(() => {
    async function getVotes() {
      const votesData = await API.getVotes();
      setVotes(votesData);
    }
    if (!votes) getVotes();
  }, [votes]);

  const clickHandler = async (e: MouseEvent) => {
    e.preventDefault();
    if (!images) return;
    const imagesData = await API.getImages(images.length / 6);
    setImages([...images, ...imagesData]);
  };

  if (!images)
    return (
      <div
        style={{
          display: "block",
          textAlign: "center",
          fontSize: "20px",
          color: "gray",
          margin: "50px",
        }}
      >
        No images yet...
      </div>
    );

  const items = images.map((image) => {
    return (
      <div
        key={image.id}
        style={{ margin: "20px", border: "solid 1px", width: "350px" }}
      >
        <div style={{ textAlign: "center" }}>Cat...</div>
        <div>
          <img
            src={image.url}
            alt={image.id}
            style={{ width: "100%", height: "250px", objectFit: "cover" }}
          />
        </div>
        <FavouriteButton imageId={image.id} favorites={favorites || []} />
        <VoteComponent imageId={image.id} votes={votes || []} />
      </div>
    );
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {items}
      </div>

      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={clickHandler}
          style={{
            maxWidth: "300px",
            borderRadius: "10px",
            padding: "3px",
            display: "block",
            margin: "0 auto",
          }}
        >
          Get more cats
        </button>
      </div>
    </>
  );
};

export default Post;
