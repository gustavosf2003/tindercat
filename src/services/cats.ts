import { CatImage } from "@src/types/cat";
import axios from "axios";

async function getCatImages(limit: number): Promise<CatImage[]> {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function reviewCat(id: string, vote: number): Promise<boolean> {
  try {
    const response = await axios.post(
      `https://api.thecatapi.com/v1/votes`,
      {
        image_id: id,
        value: vote,
      },
      {
        headers: {
          // This is not a good practice, but I'm doing it for testing purposes
          "x-api-key":
            "live_hUZQNFTG3f2YWtV1HFeBTZpffwFDYUfp11ZbREx8BDJPGas1SZe5Yxolk4N9ANnw",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const catsService = { getCatImages, reviewCat };

export default catsService;
