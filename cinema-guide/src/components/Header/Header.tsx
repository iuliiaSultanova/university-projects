import styles from "./Header.module.scss";
import { Navigation } from "../Navigation/Navigation";
import { NavigationItem } from "../NavigationItem/NavigationItem";
import { NavLink, Link } from "react-router";
import { openModal } from "../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../store/store";
import { useState } from "react";
import { getSearchResults } from "../../shared/hooks/getSearchResults";
import { CustomInput } from "../CustomInput/CustomInput";
import { useUserSession } from "../../shared/hooks/useUserSession";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(false);
  const { isLoggedIn } = useSelector((store: AppStore) => store.userState);
  const { getUserName } = useUserSession();
  const firstName = getUserName().name;
  console.log("logged in?", isLoggedIn);
  console.log("name", firstName);

  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    if (value) {
      console.log("value", value);
      const results = await getSearchResults(value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleLoginClick = () => {
    console.log("LOGIN MODAL OPEN");
    dispatch(openModal());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <img src="/logos/logo.svg" className={styles.logo}></img>
        </Link>

        <div className={styles.header_pc}>
          <Navigation
            handleSearch={handleSearch}
            searchResults={searchResults}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {isLoggedIn ? (
            <Link to="/profile">
              <NavigationItem>{firstName || "Профиль"}</NavigationItem>
            </Link>
          ) : (
            <NavigationItem onClick={handleLoginClick}>Войти</NavigationItem>
          )}
        </div>
        <div className={styles.header_mobile}>
          <NavLink to="/genres" className={styles.mobile_elem}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7C11.5 9.48528 9.48528 11.5 7 11.5ZM7 21.5C4.51472 21.5 2.5 19.4853 2.5 17C2.5 14.5147 4.51472 12.5 7 12.5C9.48528 12.5 11.5 14.5147 11.5 17C11.5 19.4853 9.48528 21.5 7 21.5ZM17 11.5C14.5147 11.5 12.5 9.48528 12.5 7C12.5 4.51472 14.5147 2.5 17 2.5C19.4853 2.5 21.5 4.51472 21.5 7C21.5 9.48528 19.4853 11.5 17 11.5ZM17 21.5C14.5147 21.5 12.5 19.4853 12.5 17C12.5 14.5147 14.5147 12.5 17 12.5C19.4853 12.5 21.5 14.5147 21.5 17C21.5 19.4853 19.4853 21.5 17 21.5ZM7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5C5.61929 4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5ZM7 19.5C8.38071 19.5 9.5 18.3807 9.5 17C9.5 15.6193 8.38071 14.5 7 14.5C5.61929 14.5 4.5 15.6193 4.5 17C4.5 18.3807 5.61929 19.5 7 19.5ZM17 9.5C18.3807 9.5 19.5 8.38071 19.5 7C19.5 5.61929 18.3807 4.5 17 4.5C15.6193 4.5 14.5 5.61929 14.5 7C14.5 8.38071 15.6193 9.5 17 9.5ZM17 19.5C18.3807 19.5 19.5 18.3807 19.5 17C19.5 15.6193 18.3807 14.5 17 14.5C15.6193 14.5 14.5 15.6193 14.5 17C14.5 18.3807 15.6193 19.5 17 19.5Z"
                fill="white"
              />
            </svg>
          </NavLink>
          {/* search function */}
          <a
            className={styles.mobile_elem}
            onClick={() => setDisplaySearch(true)}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z"
                fill="white"
              />
            </svg>
          </a>
          <NavLink to="/profile" className={styles.mobile_elem}>
            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z"
                fill="white"
              />
            </svg>
          </NavLink>
          {displaySearch && (
            <CustomInput
              handleSearch={handleSearch}
              searchResults={searchResults}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
        </div>
      </div>
      {/* {searchQuery && <SearchDropdown results={searchResults} />} */}
    </header>
  );
};
