import { MovieCard } from "../../components/MovieCard/MovieCard";
import { MovieType } from "../../shared/types";
import styles from "./UserProfile.module.scss";

type Props = {
  movies: MovieType[] | null;
};

export const Favorites = ({ movies }: Props) => {
  return (
    <div className={styles.favs_content}>
      {movies &&
        movies?.map((movie, index) => (
          <MovieCard posterUrl={movie.posterUrl || ""} key={index} deletable={true} id={movie.id}/>
        ))}
    </div>
  );
};
