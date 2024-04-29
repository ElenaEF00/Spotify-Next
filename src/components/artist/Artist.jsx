import { useRouter } from "next/router";
import styles from "./index.module.scss";

const Artist = ({ artistData }) => {
  const router = useRouter();

  const onHandleArtistClick = (id) => {
    router.push(`artist/${id}`);
  };
  return (
    <>
      <div>
        <div
          className={styles.artist}
          onClick={() => onHandleArtistClick(artistData.id)}
        >
          {artistData && artistData.images?.length > 0 ? (
            <img src={artistData.images[2]?.url} className={styles.pic}></img>
          ) : (
            <img src={artistData.images[0]?.url} className={styles.pic}></img>
          )}
          <h5 className={styles.name}>{artistData?.name}</h5>
        </div>
      </div>
    </>
  );
};

export default Artist;
