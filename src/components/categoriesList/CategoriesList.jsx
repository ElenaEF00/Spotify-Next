import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import Category from "../category";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch("https://api.spotify.com/v1/browse/categories?limit=10", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.categories.items));
  }, []);
  return (
    <>
      <div className={styles.categoriesList}>
        <h2 className={styles.title}>Sfoglia tutto</h2>
        <div className={styles.categories}>
          {categories.length > 0 ? (
            categories.map((category, key) => (
              <Category key={key} categoryData={category} />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoriesList;
