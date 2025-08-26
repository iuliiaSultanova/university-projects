import styles from "./TopMovies.module.scss";
import { MovieCard } from "../MovieCard/MovieCard";
import { NavLink } from "react-router";
import { MovieType } from "../../shared/types";
import commonStyles from "../../App.module.scss";

type Props = {
  topTen: MovieType[];
};

export const TopMovies = ({ topTen }: Props) => {
  return (
    <section className={styles.top_movies_section}>
      <div className={styles.content_container}>
        <h3 className={commonStyles.section_title}>Топ 10 фильмов</h3>
        <div className={styles.ten_movies}>
          {topTen?.map((movie: MovieType, index: number) => (
            <NavLink to={`/movies/${movie.id}`} key={index}>
              <MovieCard
                id={index + 1}
                posterUrl={movie.posterUrl || ""}
                showNum={true}
              />
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};
