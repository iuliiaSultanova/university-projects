export const useUserSession = () => {
  const setUserSession = (userName: string) => {
    localStorage.setItem("loginSession", "true");
    localStorage.setItem("userInfo", JSON.stringify({ name: userName || "" }));
  };

  const deleteUserSession = () => {
    localStorage.removeItem("loginSession");
    localStorage.removeItem("userInfo");
  };

  const getUserSession = () => {
    const temp = localStorage.getItem("loginSession");
    if (temp != null) {
      return JSON.parse(temp);
    }

    return null;
  };

  const getUserName = () => {
    const temp = localStorage.getItem("userInfo");

    if (temp != null) {
      return JSON.parse(temp);
    }
  };

  return { setUserSession, deleteUserSession, getUserSession, getUserName };
};
