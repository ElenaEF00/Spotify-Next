import styles from "./index.module.scss";

const Track = ({ trackData, id, haveImage = true }) => {
  return (
    <>
      <div className={styles.track}>
        <div className={styles.mainInfo}>
          <div className={styles.num}>
            <p>{id + 1}</p>
          </div>
          {haveImage && (
            <img
              src={trackData?.album.images[2].url}
              alt="album img"
              className={styles.img}
            />
          )}
          <div className={styles.info}>
            <h5 className={styles.title}>{trackData?.name}</h5>
            <h6 className={styles.artist}>
              {trackData?.artists.map((track) => track.name).join(", ")}
            </h6>
          </div>
        </div>
        <div className={styles.minutes}>
          <p>{(trackData?.duration_ms / 60000).toFixed(2)}</p>
        </div>
      </div>
    </>
  );
};

export default Track;
