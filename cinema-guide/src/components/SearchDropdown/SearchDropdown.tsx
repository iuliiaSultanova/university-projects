import styles from "./SearchDropdown.module.scss";
import { RatingDisplay } from "../RatingDisplay/RatingDisplay";
import { convertToHoursAndMinutes } from "../../shared/libs/convertToHoursAndMins";
import { MovieType } from "../../shared/types";

type Props = {
  results: any;
};

export const SearchDropdown = ({ results }) => {
  return (
    <ul className={styles.dropdown_list}>
      {results &&
        results.slice(0, 5).map((result: MovieType, index: number) => (
          <li className={styles.list_item} key={index}>
            <div className={styles.img_container}>
              <img src={result.posterUrl || ""} />
            </div>
            <div className={styles.text_container}>
              <div className={styles.text_top}>
                <RatingDisplay rating={result.tmdbRating || 0} size="small" />
                {/* <div className={styles.movie_info}> */}
                  <span>{result.releaseYear}</span>
                  {result.genres && <span>{result.genres.join(", ")}</span>}
                  <span>{convertToHoursAndMinutes(result?.runtime || 0)}</span>
               {/*  </div> */}
              </div>
              <h3 className={styles.text_bottom}>{result.title}</h3>
            </div>
          </li>
        ))}
      {results.length === 0 && (
        <li className={styles.list_item}>
          <h3 className={styles.text_bottom}>Пусто!</h3>
        </li>
      )}
    </ul>
  );
};
