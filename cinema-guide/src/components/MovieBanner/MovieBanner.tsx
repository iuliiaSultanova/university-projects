import styles from "./MovieBanner.module.scss";
import { RatingDisplay } from "../RatingDisplay/RatingDisplay";
import { BaseButton } from "../BaseButton/BaseButton";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { convertToHoursAndMinutes } from "../../shared/libs/convertToHoursAndMins";
import { NavLink } from "react-router";
import { MovieType } from "../../shared/types";
import { saveToFavorites } from "../../shared/hooks/saveToFavorites";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../store/store";
import { openModal } from "../../store/modalSlice";
import { TrailerPlayer } from "../TrailerPlayer/TrailerPlayer";
import { useState } from "react";

type Props = {
  data: MovieType;
  setBannerData: (arg0: any) => void;
  getBannerData: () => Promise<MovieType | null>;
};

export const MovieBanner = ({ data, setBannerData, getBannerData }: Props) => {
  console.log(data);
  const { isLoggedIn } = useSelector((store: AppStore) => store.userState);
  const [playTrailer, setPlayTrailer] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async () => {
    const newBannerData = await getBannerData();
    setBannerData(newBannerData);
  };

  const handleSaveToFaves = async () => {
    if (isLoggedIn) {
      const result = await saveToFavorites(data.id.toString());
      console.log(result);
    } else {
      console.log("not logged in");
      dispatch(openModal());
    }
  };

  const handlePlayTrailer = () => {
    setPlayTrailer(true);
  };

  return (
    <section className={styles.banner_section}>
      <div className={styles.banner_container}>
        <div className={styles.movie_info}>
          <div className={styles.movie_facts}>
            <RatingDisplay rating={data?.tmdbRating || 0} />
            <span className={styles.facts_text}>{data?.releaseYear}</span>
            {data?.genres?.map((genre: string, index: number) => (
              <span className={styles.facts_text} key={index}>
                {genre}
              </span>
            ))}
            <span className={styles.facts_text}>
              {convertToHoursAndMinutes(data?.runtime || 0)}
            </span>
          </div>
          <div className={styles.movie_descr}>
            <h1 className={styles.movie_title}>{data?.title}</h1>
            <span className={styles.movie_plot}>{data?.plot}</span>
          </div>
        </div>
        <div className={styles.action_container}>
          <BaseButton
            customType="primary"
            id="trailer"
            onClick={handlePlayTrailer}
          >
            Трейлер
          </BaseButton>
          <BaseButton customType="secondary">
            <NavLink to={`movies/${data?.id}`} className={styles.detail_link}>
              О фильме
            </NavLink>
          </BaseButton>
          <FavoriteButton onClick={handleSaveToFaves} />
          <BaseButton customType="secondary" onClick={handleClick}>
            <img src="/logos/update_icon.svg" />
          </BaseButton>
        </div>
      </div>
      <div className={styles.banner_backdrop}>
        <img src={data?.backdropUrl || ""} className={styles.main_img} />
      </div>
      {playTrailer && (
        <TrailerPlayer
          videoUrl={data?.trailerUrl || ""}
          setPlayTrailer={setPlayTrailer}
          videoTitle={data?.title || ""}
        />
      )}
    </section>
  );
};
