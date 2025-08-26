import { InputHTMLAttributes } from "react";
import styles from "./CustomInput.module.scss";
import { SearchDropdown } from "../SearchDropdown/SearchDropdown";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch:  (value: string) => Promise<void>;
  searchResults: never[];
}

export const CustomInput = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  searchResults,
}: Props) => {
  const handleClear = () => {
    console.log('FURE')
    setSearchQuery("");
  };
  return (
    <>
      <div className={styles.search_container}>
        <img
          src="/logos/search_icon.svg" // Replace with your search icon path
          alt="Search Icon"
          className={styles.search_icon}
        />
        <input
          className={`${styles.custom_input}`}
          value={searchQuery}
          placeholder="Поиск"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchQuery && (
          <button className={styles.clear_btn} onClick={handleClear}>
            <img src="/logos/close_icon.svg" className={styles.clear_icon} />
          </button>
        )}
      </div>
      {searchQuery && <SearchDropdown results={searchResults} />}
    </>
  );
};
