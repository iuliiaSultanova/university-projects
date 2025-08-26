import axios from "axios";

export const saveToFavorites = async (id: string) => {
  try {
    const response = await axios.post(
      "https://cinemaguide.skillbox.cc/favorites",
      { id: id },
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    console.log("add to favs", response);
  } catch (err) {
    console.log(err);
  }
};
