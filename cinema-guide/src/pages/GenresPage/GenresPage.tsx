import styles from "./GenresPage.module.scss";
import commonStyles from "../../App.module.scss";
import { GenreCard } from "../../components/GenreCard/GenreCard";
import { getGenresList } from "../../shared/hooks/getGenresList";
import { useEffect, useState } from "react";
import { Genre } from "../../shared/types";

export const GenresPage = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getGenresList();
        setGenres(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  console.log('genres', genres)

  return (
    <section className={styles.genres}>
      <div className={styles.page_container}>
        <h1 className={commonStyles.section_title}>Жанры фильмов</h1>
        <div className={styles.genres_container}>
          {genres.map((genre, index) => (
            <GenreCard
              key={index}
              genre={genre.name}
              img={genre.imgUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
