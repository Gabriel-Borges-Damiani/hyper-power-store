import styles from "./search.module.css";

import { SearchIcon } from "../SearchIcon/index.jsx";

export const SearchBar = () => {
  return (
    <>
      <input
        type="text"
        placeholder="O que você precisa hoje?"
        className={styles.input}
      />
      <button className={styles.searchIcon}>
        <SearchIcon></SearchIcon>
      </button>
    </>
  );
};
