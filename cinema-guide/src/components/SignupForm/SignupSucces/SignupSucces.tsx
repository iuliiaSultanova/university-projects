import styles from "./SignupSucces.module.scss";
import { BaseButton } from "../../BaseButton/BaseButton";

export const SignupSucces = () => {
  return (
    <div className={styles.success_container}>
      <p className={styles.success_notice}>Регистрация завершена</p>
      <p className={styles.success_descr}>
        Используйте вашу электронную почту для входа
      </p>
      <BaseButton customType="primary" style={{ width: "295px" }}>
        Войти
      </BaseButton>
    </div>
  );
};
