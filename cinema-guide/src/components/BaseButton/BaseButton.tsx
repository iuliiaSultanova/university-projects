import styles from "./BaseButton.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customType: "primary" | "secondary";
  children: React.ReactNode;
}

export const BaseButton = ({ customType, children, ...props }: Props) => {
  return <button className={`${styles.button_base} ${styles[customType]}`} {...props}>{children}</button>;
};
