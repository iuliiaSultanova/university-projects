import axios from "axios";

export const getSearchResults = async (query: string) => {
  try {
    const response = await axios.get(`https://cinemaguide.skillbox.cc/movie?title=${query}`);
    const data = response.data;

    console.log("search results", data);

    return data;
  } catch (err) {
    console.error("Error fetching search results:", err);
    return []; 
  }
};