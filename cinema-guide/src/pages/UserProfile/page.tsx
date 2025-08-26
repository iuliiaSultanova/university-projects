import styles from "./UserProfile.module.scss";
import commonStyles from "../../App.module.scss";
import { useEffect, useState } from "react";
import { Settings } from "./Settings";
import { useSelector } from "react-redux";
import { AppStore } from "../../store/store";
import { getUserInfo } from "../../shared/hooks/getUserInfo";
import { Favorites } from "./Favorites";
import { getFavorites } from "../../shared/hooks/getFavorites";

export const UserProfile = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { isLoggedIn } = useSelector((store: AppStore) => store.userState);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    favorites: [],
  });

  useEffect(() => {
    const retrieveUserInfo = async () => {
      const info = await getUserInfo();
      const favorites = await getFavorites();
      console.log("info", info);
      setUserData({
        name: info.name || "",
        surname: info.surname || "",
        email: info.email || "",
        favorites: favorites || [],
      });
    };

    if (isLoggedIn) {
      retrieveUserInfo();
    } else {
      console.log("user is not logged in");
    }
  }, [isLoggedIn]);

  console.log('FAVS', userData.favorites)

  return (
    <section className={styles.profile_section}>
      <h1 className={commonStyles.section_title}>Мой аккаунт</h1>
      <div className={styles.profile_content}>
        <div className={styles.btns_container}>
          <button
            className={`${styles.tabs_btn} ${
              activeIndex === 1 ? styles.active : ""
            }`}
            onClick={() => setActiveIndex(1)}
          >
            <img src="/logos/heart_icon.svg" />
            <span className={styles.btn_text_pc}>Избранные фильмы</span>
            <span className={styles.btn_text_sp}>Избранное</span>
          </button>
          <button
            className={`${styles.tabs_btn} ${
              activeIndex === 2 ? styles.active : ""
            }`}
            onClick={() => setActiveIndex(2)}
          >
            <img src="/logos/header_profile.svg" />
            <span className={styles.btn_text_pc}>Настройка аккаунта</span>
            <span className={styles.btn_text_sp}>Настройки</span>
          </button>
        </div>
        <div className={styles.tabs_content}>
          <div
            className={`${styles.content} ${
              activeIndex === 1 ? styles.show : styles.hide
            }`}
          >
            <Favorites movies={userData.favorites} />
          </div>
          <div
            className={`${styles.content} ${
              activeIndex === 2 ? styles.show : styles.hide
            }`}
          >
            <Settings
              name={userData.name}
              surname={userData.surname}
              email={userData.email}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
