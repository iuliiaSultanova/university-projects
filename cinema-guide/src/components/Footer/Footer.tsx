import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.copyright_text}>
          <span className={styles.text_left}>LLC «Мультимедиа Визион»</span>
          <span className={styles.text_right}> <span className={styles.copy_icon}>&copy;</span> Все права защищены</span>
        </div>
        <div className={styles.socials_container}>
          <a className={styles.socials}>
            <img src="/logos/socials_vk.svg" />
          </a>
          <a className={styles.socials}>
            <img src="/logos/socials_youtube.svg" />
          </a>
          <a className={styles.socials}>
            <img src="/logos/socials_odnoklass.svg" />
          </a>
          <a className={styles.socials}>
            <img src="/logos/socials_telegram.svg" />
          </a>
        </div>
      </div>
    </footer>
  );
};
