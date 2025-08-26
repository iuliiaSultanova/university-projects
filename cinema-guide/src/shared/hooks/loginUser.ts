import axios from "axios";

type Props = {
  email: string;
  password: string;
};

export const loginUser = async (userInfo: Props) => {
  try {
    const response = await axios.post(
      "https://cinemaguide.skillbox.cc/auth/login",
      { email: userInfo.email, password: userInfo.password },
      { withCredentials: true }
      /* {
        headers: {
          "Content-type": "application/json",
          withCredentials: "true",
        },
      } */
    );

    console.log("login", response);
    return response.data.result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
