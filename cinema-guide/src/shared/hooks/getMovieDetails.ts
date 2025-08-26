import axios from "axios";

export const getMovieDetails = async (id: string) => {
  try {
    const response = await axios.get(`https://cinemaguide.skillbox.cc/movie/${id}`);
    const data = response.data;

    console.log("movie details", data);

    return data;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    return null; // Return `null` or a fallback value in case of an error
  }
};

