import { useState } from "react";
import { BaseButton } from "../BaseButton/BaseButton";
import styles from "./SignupForm.module.scss";
import { SignupSucces } from "./SignupSucces/SignupSucces";
import { useForm } from "react-hook-form";
import { signUpUser } from "../../shared/hooks/signUpUser";

type Props = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SignupForm = ({ setIsLogin }: Props) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = async () => {
    const values = getValues();
    const userData = {
      email: values.email,
      password: values.password,
      name: values.firstname,
      surname: values.lastname || "",
    };

    try {
      const result = await signUpUser(userData);
      setIsSuccess(result);
    } catch (err) {
      console.log(err);
    }

    //setIsLogin(true);
  };

  const handleClick = () => {
    setIsLogin(true);
  };

  return (
    <div className={styles.form_container}>
      {!isSuccess && (
        <>
          <form className={styles.signup_form}>
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
                placeholder="Имя"
                className={`${styles.form_name} ${
                  errors.firstname ? styles.error : ""
                }`}
                {...register("firstname", { required: "Имя обязательно" })}
              />
              <input
                placeholder="Фамилия"
                className={`${styles.form_name} ${
                  errors.surname ? styles.error : ""
                }`}
                {...register("surname")}
              />
              <input
                placeholder="Пароль"
                className={`${styles.form_password} ${
                  errors.password ? styles.error : ""
                }`}
                {...register("password", { required: "Пароль обязателен" })}
              />
              <input
                placeholder="Подтвердите пароль"
                className={`${styles.form_password} ${
                  errors.password_confirm ? styles.error : ""
                }`}
                {...register("password_confirm", {
                  required: "Подтверждение пароля обязательно",
                })}
              />
            </div>
          </form>
          <BaseButton
            customType="primary"
            type="submit"
            onClick={() => onSubmit()}
            style={{ width: "295px" }}
          >
            Создать аккаунт
          </BaseButton>
          <a className={styles.form_login} onClick={handleClick}>
            У меня есть пароль
          </a>
        </>
      )}

      {isSuccess && <SignupSucces />}
    </div>
  );
};
