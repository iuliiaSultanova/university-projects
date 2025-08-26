import { ReactNode } from "react";
import styles from "./UserProfile.module.scss";
import { BaseButton } from "../../components/BaseButton/BaseButton";
import { logoutUser } from "../../shared/hooks/logoutUser";

import { setLoggedOut } from "../../store/userSlice";

import { useUserSession } from "../../shared/hooks/useUserSession";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

type Props = {
  name: string;
  surname: string;
  email: string;
};

type CircleProps = {
  children: ReactNode | string;
};

export const Settings = ({ name, surname, email }: Props) => {
  const initials = (name?.[0] || "") + (surname?.[0] || "");

  const { deleteUserSession } = useUserSession();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      console.log("logout result", result);

      // navigate to the main page
      navigate("/");

      dispatch(setLoggedOut());
      deleteUserSession();
    } catch (err) {
      console.log("Не получилось выйти", err);
    }
  };

  return (
    <div className={styles.setting_content}>
      <ul className={styles.settings_list}>
        <li className={styles.settings_item}>
          <InfoCircle>{initials}</InfoCircle>
          <div className={styles.item_text}>
            <span className={styles.item_label}>Имя Фамилия</span>
            <span className={styles.main_text}>
              {name} {surname}
            </span>
          </div>
        </li>
        <li className={styles.settings_item}>
          <InfoCircle>
            <img src="/logos/email.svg" />
          </InfoCircle>
          <div className={styles.item_text}>
            <span className={styles.item_label}>Электронная почта</span>
            <span className={styles.main_text}>{email}</span>
          </div>
        </li>
      </ul>

      <BaseButton
        customType="primary"
        style={{ width: "262px" }}
        onClick={handleLogout}
      >
        Выйти из аккаунта
      </BaseButton>
    </div>
  );
};

const InfoCircle = ({ children }: CircleProps) => {
  return <span className={styles.info_circle}>{children}</span>;
};
