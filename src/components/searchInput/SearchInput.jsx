import styles from "./index.module.scss";
import { GoSearch } from "react-icons/go";
import { useRouter } from "next/router";
import { useState } from "react";

const SearchInput = ({ setSearchResults, setIsLoading }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    {
      const token = window.localStorage.getItem("token");
      fetch(
        `https://api.spotify.com/v1/search?q=${search.replace(
          " ",
          "%20"
        )}&type=album%2Cartist&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data));
    }

    setIsLoading(false);
  };

  const onHandleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <GoSearch className={styles.icon} />
        <input
          type="text"
          className={styles.search}
          value={search}
          onChange={onHandleChange}
          placeholder="Cosa vuoi ascoltare?"
        />
      </form>
    </>
  );
};

export default SearchInput;
