import axios from "axios";

export const getFavorites = async () => {
  try {
    const response = await axios.get(
      `https://cinemaguide.skillbox.cc/favorites/`,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    console.log("favs", response);

    return response.data;

  } catch (err) {
    console.log(err);
    return [];
  }
};
