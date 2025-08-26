import axios from "axios";

export const getUserInfo = async () => {
  try {
    const response = await axios.get(
      "https://cinemaguide.skillbox.cc/profile",
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    console.log("profile info", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    //return false;
  }
};
