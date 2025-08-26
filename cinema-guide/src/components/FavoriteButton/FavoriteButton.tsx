import styles from "./FavoriteButton.module.scss";

export const FavoriteButton = ({...props}) => {
    return (
        <button className={styles.fav_btn} {...props}>
            <img src="/logos/heart_icon.svg" className={styles.fav_icon}/>
        </button>
    );
}