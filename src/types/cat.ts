export type CatImage = {
  height: number;
  id: string;
  url: string;
  width: number;
};

export type CatVote = {
  country_code: string;
  id: number;
  image_id: string;
  message: string;
  value: number;
};

export type SwipeActions = "accept" | "reject";
