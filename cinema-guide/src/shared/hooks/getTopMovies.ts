import axios from "axios";

export const getTopMovies = async () => {
  try {
    const response = await axios.get("https://cinemaguide.skillbox.cc/movie/top10");
    const data = response.data;

    console.log("top 10 movies", data);

    return data;
  } catch (err) {
    console.error("Error fetching top 10 movies:", err);
    return []; 
  }
};
