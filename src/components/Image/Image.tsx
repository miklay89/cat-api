import { FC, useEffect, useState } from "react";
import API, { GetImage } from "../../services/api";
import FavButtonComponent from "./FavButton";
import VoteComponent from "./Vote";

const ImageComponent: FC = () => {
  const [images, setImages] = useState<GetImage[]>([]);

  useEffect(() => {
    async function getData() {
      const imagesData = await API.getImages(0);
      const favData = await API.getFavourites();
      const voteData = await API.getVotes();
      imagesData.forEach((d) => {
        // add favourite info
        if (favData.map((fd) => fd.image_id).includes(d.id)) {
          d.isFav = true;
          d.fav_id = favData.filter((fd) => fd.image_id === d.id)[0].id;
        } else {
          d.isFav = false;
          d.fav_id = "";
        }
        // add vote info
        if (voteData.map((vd) => vd.image_id).includes(d.id)) {
          const vote = voteData.filter((vd) => vd.image_id === d.id).pop()
          d.vote_id = vote?.id!;
          d.value = vote?.value!;
        } else {
          d.vote_id = 0;
          d.value = 0;
        }
      });
      setImages([...images, ...imagesData]);
    }
    if (!images.length) getData();
  }, [images]);

  const clickHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    const data = await API.getImages(images.length / 6);
    const favData = await API.getFavourites();
    const voteData = await API.getVotes();
    data.forEach((d) => {
      // add favourite info
      if (favData.map((fd) => fd.image_id).includes(d.id)) {
        d.isFav = true;
        d.fav_id = favData.filter((fd) => fd.image_id === d.id)[0].id;
      } else {
        d.isFav = false;
        d.fav_id = "";
      }
      // add vote info
      if (voteData.map((vd) => vd.image_id).includes(d.id)) {
        const vote = voteData.filter((vd) => vd.image_id === d.id).pop()
        d.vote_id = vote?.id!;
        d.value = vote?.value!;
      } else {
        d.vote_id = 0;
        d.value = 0;
      }
    });
    setImages([...images, ...data]);
  };

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
        <FavButtonComponent
          fav_id={image.fav_id}
          isFav={image.isFav}
          img_id={image.id}
        />
        <VoteComponent
          img_id={image.id}
          vote_id={image.vote_id}
          vote_value={image.value}
        />
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

export default ImageComponent;
