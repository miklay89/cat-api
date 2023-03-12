export interface ImageData {
  id: string;
  url: string;
}

export interface Favorite {
  id: number;
  user_id: string;
  image_id: string;
  sub_id: any;
  created_at: string;
  image: ImageData | {};
}

export interface SetFavourite {
  message: string;
  id: number;
}

export interface Vote {
  id: number;
  image_id: string;
  sub_id: any;
  created_at: string;
  value: number;
  country_code: string;
  image: ImageData | {};
}

export interface SetVote {
  message: string;
  id: number;
}

export interface Image {
  breeds: any[];
  id: string;
  url: string;
  width: number;
  height: number;
  sub_id: any;
  created_at: string;
  original_filename: string;
  breed_ids: any;
}
