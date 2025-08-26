import styles from "./NavigationItem.module.scss";

type Props = React.HTMLAttributes<HTMLLIElement> & {
  children: React.ReactNode;
};

export const NavigationItem = ({ children, ...props }: Props) => {
  return (
    <li className={styles.nav_item} {...props}>
      {children}
    </li>
  );
};
