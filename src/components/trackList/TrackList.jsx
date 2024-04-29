import styles from "./index.module.scss";
import Track from "../track/Track";
import { useState, useEffect } from "react";

const TrackList = () => {
  const [savedTracks, setSavedTracks] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch("https://api.spotify.com/v1/me/tracks?limit=5", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSavedTracks(data.items));
  }, []);

  return (
    <>
      <div className={styles.TrackList}>
        <div className={styles.tracks}>
          {savedTracks.length > 0 ? (
            savedTracks.map((track, key) => (
              <Track key={key} trackData={track.track} id={key} />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackList;
