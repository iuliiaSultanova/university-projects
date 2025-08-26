import axios from "axios";

export const getGenresList = async () => {
  try {
    const response = await axios.get(`https://cinemaguide.skillbox.cc/movie/genres`);
    const data = response.data;

    const genres = data.map((elem: string) => ({
      name: elem,
      imgUrl: `/imgs/${elem}.jpg`,
    }));

    return genres;
  } catch (err) {
    console.error("Error fetching genres:", err);
    return [];
  }
};