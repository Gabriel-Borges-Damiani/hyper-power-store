import styles from "./search.module.css";

import { SearchIcon } from "../SearchIcon";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getRecentSearches, saveRecentSearch } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleFocus = async () => {
    if (!isAuthenticated) return;

    const searches = await getRecentSearches(user.id);

    setHistory(searches || []);
    setShowHistory(true);
  };

  const handleSearch = async () => {
    const term = search.trim();

    if (!term) return;

    if (isAuthenticated) {
      await saveRecentSearch(user.id, term);
    }

    navigate(`/search?q=${term}`);

    setShowHistory(false);
  };

  const handleHistoryClick = async (item) => {
    setSearch(item);

    if (isAuthenticated) {
      await saveRecentSearch(user.id, item);
    }

    navigate(`/search?q=${item}`);

    setShowHistory(false);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);

          if (showHistory) {
            setShowHistory(false);
          }
        }}
        onFocus={handleFocus}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        type="text"
        placeholder="O que você precisa hoje?"
        className={styles.input}
      />

      <button
        type="button"
        className={styles.searchIcon}
        onClick={handleSearch}
      >
        <SearchIcon />
      </button>

      {showHistory && history.length > 0 && (
        <div className={styles.historyContainer}>
          {history.map((item) => (
            <button
              key={item}
              className={styles.historyItem}
              onClick={() => handleHistoryClick(item)}
            >
              🔍 {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
