import axios from "axios";
import {
  Image,
  Favorite,
  Vote,
  SetFavourite,
  SetVote,
} from "../interfaces/interfaces";
const baseUrl = "https://api.thecatapi.com/v1";
const API_KEY =
  "live_etGJgtQvWmkQwtK2EbLA11QcEyr9mF1PXzQL6wLY3b6fcyicl22tqINcHTxR0Wnx";
const LIMIT = 6;
const SUB_ID = "my-user-1234";

export default class API {
  static async getImages(page: number): Promise<Image[]> {
    const res = await axios.get<Image[]>(
      `${baseUrl}/images?limit=${LIMIT}&page=${page}`,
      {
        headers: { "x-api-key": API_KEY },
      }
    );

    return res.data;
  }
  static async getFavourites(): Promise<Favorite[]> {
    const res = await axios.get<Favorite[]>(`${baseUrl}/favourites`, {
      headers: { "x-api-key": API_KEY },
    });

    return res.data;
  }

  static async setFavourite(imageId: string): Promise<SetFavourite> {
    const res = await axios.post<SetFavourite>(
      `${baseUrl}/favourites`,
      { image_id: imageId },
      {
        headers: { "x-api-key": API_KEY },
      }
    );

    return res.data;
  }

  static async deleteFavourite(id: number): Promise<void> {
    await axios.delete(`${baseUrl}/favourites/${id}`, {
      headers: { "x-api-key": API_KEY, "content-type": "application/json" },
    });
  }

  static async getVotes(): Promise<Vote[]> {
    const res = await axios.get<Vote[]>(`${baseUrl}/votes?sub_id=${SUB_ID}`, {
      headers: { "x-api-key": API_KEY },
    });

    return res.data;
  }

  static async setVote(imageId: string, value: number): Promise<SetVote> {
    const payload = {
      image_id: imageId,
      sub_id: SUB_ID,
      value,
    };
    const res = await axios.post<SetVote>(`${baseUrl}/votes`, payload, {
      headers: { "x-api-key": API_KEY },
    });

    return res.data;
  }
}
