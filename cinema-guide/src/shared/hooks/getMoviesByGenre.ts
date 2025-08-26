import axios from "axios";

export const getMoviesByGenre = async (genre: string) => {
  try {
    const response = await axios.get(`https://cinemaguide.skillbox.cc/movie?genre=${genre}`);
    const data = response.data;

    console.log("movies by genre", data);

    return data;
  } catch (err) {
    console.error("Error fetching movies by genre:", err);
    return []; 
  }
};
