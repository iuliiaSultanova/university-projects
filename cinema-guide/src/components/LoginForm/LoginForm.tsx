import styles from "./LoginForm.module.scss";
import { BaseButton } from "../BaseButton/BaseButton";
import { useForm } from "react-hook-form";
import { loginUser } from "../../shared/hooks/loginUser";
// import { setLoggedIn } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useUserSession } from "../../shared/hooks/useUserSession";
import { setLoggedIn, setUserInfo } from "../../store/userSlice";
import { getUserInfo } from "../../shared/hooks/getUserInfo";

type Props = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginForm = ({ setIsLogin }: Props) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });
  const dispatch = useDispatch();
  const { setUserSession } = useUserSession();

  const onSubmit = async () => {
    const values = getValues();
    const userData = {
      email: values.email,
      password: values.password,
    };

    try {
      const result = await loginUser(userData);
      console.log("login result", result);

      if (result === true) {
        const userInfo = await getUserInfo();
        setUserSession(userInfo.name);
        dispatch(setLoggedIn());

        console.log("userInfo", userInfo.name);
        dispatch(
          setUserInfo({
            firstName: userInfo?.name || "",
            lastName: userInfo?.surname || "",
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    console.log("moving to sign up form");
    setIsLogin(false);
  };

  return (
    <div className={styles.login_container}>
      <form className={styles.login_form}>
        <div className={styles.inputs_container}>
          <input
            placeholder="Электронная почта"
            className={`${styles.form_email} ${
              errors.email ? styles.error : ""
            }`}
            {...register("email", {
              required: "Электронная почта обязательна",
            })}
          />
          <input
            placeholder="Пароль"
            className={`${styles.form_password} ${
              errors.password ? styles.error : ""
            }`}
            {...register("password", { required: "Пароль обязателен" })}
          />
        </div>
      </form>
      <BaseButton
        customType="primary"
        onClick={onSubmit}
        style={{ width: "295px" }}
      >
        Войти
      </BaseButton>
      <a className={styles.form_register} onClick={handleClick}>
        Регистрация
      </a>
    </div>
  );
};
