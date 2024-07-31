import { CatImage } from "@src/types/cat";
import axios from "axios";

async function getCatImages(limit: number): Promise<CatImage[]> {
  try {
    //x-api-key live_hUZQNFTG3f2YWtV1HFeBTZpffwFDYUfp11ZbREx8BDJPGas1SZe5Yxolk4N9ANnw
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}`,
      {
        headers: {
          "x-api-key":
            "live_hUZQNFTG3f2YWtV1HFeBTZpffwFDYUfp11ZbREx8BDJPGas1SZe5Yxolk4N9ANnw",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const catsService = { getCatImages };

export default catsService;
