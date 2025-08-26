import styles from "./MovieGenreList.module.scss";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { useParams } from "react-router";
import { getMoviesByGenre } from "../../shared/hooks/getMoviesByGenre";
import { useEffect, useState } from "react";
import { MovieType } from "../../shared/types";
import { Link } from "react-router";
import { BaseButton } from "../../components/BaseButton/BaseButton";

export const MovieGenreList = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const params = useParams();
  const genreName = params.name || "";
  const [moviesToShow, setMoviesToShow] = useState<number>(14);
  console.log("genre", genreName);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMoviesByGenre(genreName);
        setMovies(data);
        console.log(movies);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleClick = () => {
    setMoviesToShow((prev) => prev + 10);
  };

  console.log("movies by genre", movies);
  return (
    <section className={styles.list_section}>
      <div className={styles.content_container}>
        <Link to="/genres" className={styles.link_back}>
          <h1 className={styles.section_title}>
            <img src="/logos/back_arrow.svg" className={styles.title_arrow} />
            {genreName}
          </h1>
        </Link>

        <div className={styles.list_items}>
          {movies?.slice(0, moviesToShow).map((movie, index) => (
            <Link to={`/movies/${movie.id}`} className={styles.link_back}>
              <MovieCard posterUrl={movie?.posterUrl || ""} key={index} />
            </Link>
          ))}
        </div>
        {moviesToShow < movies.length && (
          <div className={styles.list_control}>
            <BaseButton
              customType="primary"
              style={{ width: "218px" }}
              onClick={handleClick}
            >
              Показать ещё
            </BaseButton>
          </div>
        )}
      </div>
    </section>
  );
};
