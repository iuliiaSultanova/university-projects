import axios from "axios";

export const deleteFromFavs = async (id: string) => {
  try {
    const response = await axios.delete(
      `https://cinemaguide.skillbox.cc/favorites/${id}`,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    console.log("delete from favs", response);
  } catch (err) {
    console.log(err);
  }
};