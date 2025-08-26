import styles from "./LoginModal.module.scss";
import { LoginForm } from "../LoginForm/LoginForm";
import { closeModal } from "../../store/modalSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SignupForm } from "../SignupForm/SignupForm";
//import { SignupSucces } from "../LoginForm/SignupSucces/SignupSucces";

export const LoginModal = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  //const [isSignupSuccess, setIsSignupSuccess] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Reset to default when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <span className={styles.modal_close} onClick={handleClose}>
          {/* HTML code for a multiplication sign */}
          &#10005;
        </span>
        <div className={styles.content_container}>
          <img src="/logos/logo.svg" className={styles.modal_logo} />
          {isLogin && <LoginForm setIsLogin={setIsLogin} />}
          {!isLogin && <SignupForm setIsLogin={setIsLogin} />}
        </div>
      </div>
    </div>
  );
};
