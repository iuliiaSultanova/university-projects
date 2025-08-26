import styles from "./RatingDisplay.module.scss";

type Props = {
  rating: number;
  size?: 'small';
};

export const RatingDisplay = ({ rating, size }: Props) => {
  const ratingColor = determineRatingColor(rating);
  return (
    <div className={`${styles.rating_container} ${styles[ratingColor]} ${styles[size || '']}`}>
      <img className={styles.star_icon} src="/logos/star_icon_white.svg" />
      {Math.round(rating * 10) / 10}
    </div>
  );
};

const determineRatingColor = (rating: number) => {
  if (rating >= 8) return "gold";
  if (rating >= 7) return "green";
  if (rating >= 4) return "grey";
  return "red";
};
