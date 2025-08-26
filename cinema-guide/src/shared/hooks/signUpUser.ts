import axios from "axios";

type Props = {
  email: string;
  password: string;
  name: string;
  surname?: string;
};

export const signUpUser = async (userInfo: Props) => {
  try {
    const response = await axios.post("https://cinemaguide.skillbox.cc/user", {
      email: userInfo.email,
      password: userInfo.password,
      name: userInfo.name,
      surname: userInfo.surname || '',
    });

    return response.data.success;
  } catch (error) {
    console.log(error);
    return false;
  }
};
