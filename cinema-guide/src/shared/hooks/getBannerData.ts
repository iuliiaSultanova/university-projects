import axios from "axios";
import { MovieType } from "../types";

export const getBannerData = async (): Promise<MovieType> => {
  try {
    const response = await axios.get("https://cinemaguide.skillbox.cc/movie/random");
    const data = response.data;

    return data;
  } catch (err) {
    console.error("Error fetching banner data:", err);
    return null;
  }
};

