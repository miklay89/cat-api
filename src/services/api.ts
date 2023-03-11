import axios from "axios";
const baseUrl = "https://api.thecatapi.com/v1";
const API_KEY =
  "live_etGJgtQvWmkQwtK2EbLA11QcEyr9mF1PXzQL6wLY3b6fcyicl22tqINcHTxR0Wnx";
const LIMIT = 6;

export interface GetImage {
  id: string;
  url: string;
  width: number;
  isFav: boolean;
  fav_id: string;
  vote_id: number;
  value: number;
}

export interface GetFAv {
  id: string;
  image_id: string;
}

export interface getVotes {
  id: number;
  image_id: string;
  sub_id: string;
  value: number;
}

export interface VoteUp {
  message: string;
  id: number;
}

export default class API {
  static async getImages(page: number) {
    const res = await axios.get<GetImage[]>(
      `${baseUrl}/images?limit=${LIMIT}&page=${page}`,
      {
        headers: { "x-api-key": API_KEY },
      }
    );

    return res.data;
  }

  static async setFavourite(id: string) {
    const res = await axios.post<{ id: string }>(
      `${baseUrl}/favourites`,
      { image_id: id },
      {
        headers: { "x-api-key": API_KEY },
      }
    );
    return res.data;
  }

  static async deleteFavourite(id: string) {
    await axios.delete(`${baseUrl}/favourites/${id}`, {
      headers: { "x-api-key": API_KEY, "content-type": "application/json" },
    });
  }

  static async getFavourites() {
    const res = await axios.get<GetFAv[]>(`${baseUrl}/favourites`, {
      headers: { "x-api-key": API_KEY },
    });
    const ids = [...new Set(res.data.map((e) => e.image_id))];
    const fav = res.data.filter((d) => ids.includes(d.image_id));

    return fav;
  }

  static async getVotes() {
    const res = await axios.get<getVotes[]>(`${baseUrl}/votes`, {
      headers: { "x-api-key": API_KEY },
    });
    const uniq = [...new Set(res.data.map((e) => e.image_id))];
    const votes = res.data.filter((d) => uniq.includes(d.image_id));
    return votes;
  }

  static async setVote(imgId: string, value: number) {
    const payload = {
      image_id: imgId,
      value,
    };
    const res = await axios.post<VoteUp>(`${baseUrl}/votes`, payload, {
      headers: { "x-api-key": API_KEY },
    });
    return res.data;
  }
}
