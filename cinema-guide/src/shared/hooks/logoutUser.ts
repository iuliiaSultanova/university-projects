import axios from "axios";

export const logoutUser = async () => {
  try {
    const response = await axios.get(
      "https://cinemaguide.skillbox.cc/auth/logout",
      {
        headers: {
          "Content-type": "application/json",
          withCredentials: "true",
        },
      }
    );

    console.log("logout", response);
    return response.data.result;
  } catch (err) {
    console.log(err);
    return false;
  }
};
