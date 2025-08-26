import styles from "./Navigation.module.scss";
import { NavigationItem } from "../NavigationItem/NavigationItem";
import { CustomInput } from "../CustomInput/CustomInput";
import { NavLink } from "react-router";

type Props = {
  handleSearch: (value: string) => Promise<void>;
  searchResults: never[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const Navigation = ({ handleSearch, searchResults, searchQuery, setSearchQuery }: Props) => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <NavigationItem>
          <NavLink to="/" className={styles.nav_link}>
            Главная
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/genres" className={styles.nav_link}>
            Жанры
          </NavLink>
        </NavigationItem>
        <CustomInput
          handleSearch={handleSearch}
          searchResults={searchResults}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </ul>
    </nav>
  );
};
