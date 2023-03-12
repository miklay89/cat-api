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
  "live_mzte9TLRDZcXLVjdoiDBB3k0iXDzQf3rZPa5W4tEzKOkhk8WGIhfVjpin3KD1yjD";
const LIMIT = 6;
const SUB_ID = "my-user-1234";

export default class API {
  static async getImages(page: number): Promise<Image[] | null> {
    try {
      const res = await axios.get<Image[]>(
        `${baseUrl}/images?limit=${LIMIT}&page=${page}`,
        {
          headers: { "x-api-key": API_KEY },
        }
      );

      return res.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  static async getFavourites(): Promise<Favorite[] | null> {
    try {
      const res = await axios.get<Favorite[]>(`${baseUrl}/favourites`, {
        headers: { "x-api-key": API_KEY },
      });

      return res.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async setFavourite(imageId: string): Promise<SetFavourite | null> {
    try {
      const res = await axios.post<SetFavourite>(
        `${baseUrl}/favourites`,
        { image_id: imageId },
        {
          headers: { "x-api-key": API_KEY },
        }
      );

      return res.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async deleteFavourite(id: number): Promise<void> {
    try {
      await axios.delete(`${baseUrl}/favourites/${id}`, {
        headers: { "x-api-key": API_KEY, "content-type": "application/json" },
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async getVotes(): Promise<Vote[] | null> {
    try {
      const res = await axios.get<Vote[]>(`${baseUrl}/votes?sub_id=${SUB_ID}`, {
        headers: { "x-api-key": API_KEY },
      });

      return res.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async setVote(imageId: string, value: number): Promise<SetVote | null> {
    try {
      const payload = {
        image_id: imageId,
        sub_id: SUB_ID,
        value,
      };
      const res = await axios.post<SetVote>(`${baseUrl}/votes`, payload, {
        headers: { "x-api-key": API_KEY },
      });

      return res.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
