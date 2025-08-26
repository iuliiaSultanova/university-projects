import { useEffect, useState } from "react";
import { BaseButton } from "../../components/BaseButton/BaseButton";
import { FavoriteButton } from "../../components/FavoriteButton/FavoriteButton";
import { RatingDisplay } from "../../components/RatingDisplay/RatingDisplay";
import styles from "./MovieDetails.module.scss";
import { getMovieDetails } from "../../shared/hooks/getMovieDetails";
import { useParams } from "react-router";
import { convertToHoursAndMinutes } from "../../shared/libs/convertToHoursAndMins";
import { MovieType } from "../../shared/types";
import { TrailerPlayer } from "../../components/TrailerPlayer/TrailerPlayer";

export const MovieDetails = () => {
  const [movieData, setMovieData] = useState<MovieType>();
  const [playTrailer, setPlayTrailer] = useState(false);
  console.log("movie", movieData);

  const params = useParams();
  const movieId = params.id || "";

  const runtime = convertToHoursAndMinutes(movieData?.runtime || 0);

  const handlePlayTrailer = () => {
    setPlayTrailer(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovieData(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className={styles.details_page}>
      <div className={styles.details_banner}>
        <div className={styles.banner_container}>
          <div className={styles.movie_info}>
            <div className={styles.movie_facts}>
              <RatingDisplay rating={movieData?.tmdbRating || 0} />
              <span className={styles.facts_text}>
                {movieData?.releaseYear}
              </span>
              {movieData?.genres?.map((genre: string, index: number) => (
                <span className={styles.facts_text} key={index}>
                  {genre}
                </span>
              ))}
              <span className={styles.facts_text}>{runtime}</span>
            </div>
            <div className={styles.movie_descr}>
              <h1 className={styles.movie_title}>{movieData?.title}</h1>
              <span className={styles.movie_plot}>{movieData?.plot}</span>
            </div>
          </div>
          <div className={styles.action_container}>
            <BaseButton customType="primary" onClick={handlePlayTrailer}>
              Трейлер
            </BaseButton>
            <FavoriteButton />
          </div>
        </div>
        <div className={styles.banner_backdrop}>
          <img src={movieData?.backdropUrl || ""} className={styles.main_img} />
        </div>
        {playTrailer && (
          <TrailerPlayer
            videoUrl={movieData?.trailerUrl || ""}
            setPlayTrailer={setPlayTrailer}
            videoTitle={movieData?.title || ""}
          />
        )}
      </div>
      <div className={styles.details_text}>
        <h3 className={styles.details_section}>О фильме</h3>
        {/* <div className={styles.details_container}> */}
        <div className={styles.text_container}>
          <p className={styles.text_line}>
            <span className={styles.line_left}>Язык оригинала</span>
            {/* <span className={styles.dots}></span> */}
            <span className={styles.line_right}>
              {movieData?.language || "Неизвестно"}
            </span>
          </p>
          <p className={styles.text_line}>
            <span className={styles.line_left}>Бюджет</span>
            {/*  <span className={styles.dots}></span> */}
            <span className={styles.line_right}>
              {movieData?.budget || "Неизвестно"}
            </span>
          </p>
          <p className={styles.text_line}>
            <span className={styles.line_left}>Выручка</span>
            {/*             <span className={styles.dots}></span> */}
            <span className={styles.line_right}>
              {movieData?.revenue || "Неизвестно"}
            </span>
          </p>
          <p className={styles.text_line}>
            <span className={styles.line_left}>Режиссёр</span>
            {/* <span className={styles.dots}></span> */}
            <span className={styles.line_right}>
              {movieData?.director || "Неизвестно"}
            </span>
          </p>
          <p className={styles.text_line}>
            <span className={styles.line_left}>Продакшен</span>
            {/*  <span className={styles.dots}></span> */}
            <span className={styles.line_right}>
              {movieData?.production || "Неизвестно"}
            </span>
          </p>
          <p className={styles.text_line}>
            <span className={styles.line_left}>Награды</span>
            {/* <span className={styles.dots}></span> */}
            <span className={styles.line_right}>
              {movieData?.awardsSummary || "Неизвестно"}
            </span>
          </p>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
