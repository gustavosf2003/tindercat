import { CatImage, CatVote } from "@src/types/cat";
import axios from "axios";

const API_KEY =
  "live_hUZQNFTG3f2YWtV1HFeBTZpffwFDYUfp11ZbREx8BDJPGas1SZe5Yxolk4N9ANnw";

const axiosInstance = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key": API_KEY,
  },
});

async function getCatImages(limit: number): Promise<CatImage[]> {
  try {
    const response = await axiosInstance.get<CatImage[]>(`/images/search`, {
      params: { limit },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to fetch cat images.");
  }
}

async function reviewCat(id: string, vote: number): Promise<CatVote> {
  try {
    const response = await axiosInstance.post<CatVote>(`/votes`, {
      image_id: id,
      value: vote,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to submit vote.");
  }
}

function handleError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    console.error(
      `Axios error: ${error.response?.status} - ${error.response?.statusText}`
    );
    console.error(`Response data: ${error.response?.data}`);
  } else {
    console.error(`Unexpected error: ${error}`);
  }
}

const catsService = { getCatImages, reviewCat };

export default catsService;
