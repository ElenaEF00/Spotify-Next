import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Album from "../album/Album";

const AlbumsList = () => {
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch("https://api.spotify.com/v1/browse/new-releases?limit=8", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNewReleases(data.albums.items));
  }, []);

  return (
    <>
      <div className={styles.Discover}>
        <h2 className={styles.title}>Discover</h2>
        <div className={styles.newReleases}>
          {newReleases.length > 0 ? (
            newReleases.map((album, key) => (
              <Album key={key} albumData={album} />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default AlbumsList;
