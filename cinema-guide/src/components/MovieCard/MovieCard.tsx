import { deleteFromFavs } from "../../shared/hooks/deleteFromFavs";
import styles from "./MovieCard.module.scss";

type Props = {
  id: number;
  showNum?: boolean;
  posterUrl: string;
  deletable?: boolean;
};

export const MovieCard = ({
  posterUrl,
  id,
  showNum = false,
  deletable = false,
}: Props) => {
  const handleDelete = async () => {
    try {
      const response = await deleteFromFavs(id?.toString());
      console.log(response);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={styles.card_container}>
        {showNum && <div className={styles.place_card}>{id}</div>}
        {deletable && <div className={styles.delete_btn} onClick={handleDelete}>&#10005;</div>}
        <img src={posterUrl} />
      </div>
    </>
  );
};
