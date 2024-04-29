import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Artist from "../artist/Artist";

const ArtistList = () => {
  const [artistList, setArtistList] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch(
      "https://api.spotify.com/v1/artists?ids=06HL4z0CvFAxyc27GXpf02,6KImCVD70vtIoJWnq6nGn3,6RdcIWVKYYzNzjQRd3oyHS,4UXqAaa6dQYAk18Lv7PEgX",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setArtistList(data.artists));
  }, []);

  return (
    <>
      <div className={styles.Artist}>
        <div className={styles.container}>
          {artistList.length > 0 ? (
            artistList.map((artist, key) => (
              <Artist key={key} artistData={artist} />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtistList;
