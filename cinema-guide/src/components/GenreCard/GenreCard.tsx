import styles from "./GenreCard.module.scss";
import { Link } from "react-router";

type Props = {
  genre: string;
  img: string;
};

export const GenreCard = ({ genre, img }: Props) => {
  return (
    <div className={styles.card_container}>
      <Link to={`/genres/${genre}`} className={styles.genre_link}>
        <img src={img} className={styles.card_img} />
        <div className={styles.genre_bottom}>
          <span className={styles.genre_name}>{genre}</span>
        </div>
      </Link>
    </div>
  );
};
