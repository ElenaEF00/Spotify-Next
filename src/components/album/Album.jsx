import { useRouter } from "next/router";
import styles from "./index.module.scss";

const Album = ({ albumData, artist = true, release_date = true }) => {
  const router = useRouter();

  const onHandleAlbumClick = (id) => {
    router.push(`album/${id}`);
  };

  return (
    <>
      <div>
        <div
          className={styles.album}
          onClick={() => onHandleAlbumClick(albumData.id)}
        >
          {albumData.images.length > 1 ? (
            <img src={albumData.images[1].url} className={styles.pic}></img>
          ) : (
            <img src={albumData.images[0].url} className={styles.pic}></img>
          )}
          <div className={styles.texts}>
            <h5 className={styles.name}>{albumData.name}</h5>
            {artist && (
              <h6 className={styles.artists}>
                {albumData.artists.map((artist) => artist.name).join(", ")}
              </h6>
            )}
            {release_date && (
              <p className={styles.date}>{albumData.release_date}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Album;
