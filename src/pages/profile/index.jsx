import MainLayout from "@/layouts/mainLayout";
import styles from "../../styles/Profile.module.scss";
import Album from "@/components/album";
import Artist from "@/components/artist";
import { CiUser } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TrackList from "@/components/trackList";

export default function Profile() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [followedArtist, setFollowedArtist] = useState({});
  const [savedAlbums, setSavedAlbums] = useState({});
  const [savedPlaylists, setSavedPlaylists] = useState({});

  const router = useRouter();

  const onHandleClick = () => {
    setToken("");
    window.localStorage.removeItem("token");
    router.push("/");
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch("https://api.spotify.com/v1/me/following?type=artist&limit=5", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFollowedArtist(data.artists.items));
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch("https://api.spotify.com/v1/me/albums?limit=6", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSavedAlbums(data.items));
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch("https://api.spotify.com/v1/me/playlists?limit=6", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSavedPlaylists(data.items));
  }, []);

  return (
    <MainLayout>
      {Object.keys(user).length > 0 ? (
        <>
          <div>
            <div className={styles.profile}>
              {user.images.length > 0 ? (
                <img src={user.images[1].url} className={styles.picture}></img>
              ) : (
                <CiUser />
              )}
              <h2 className={styles.username}>{user.display_name}</h2>
              <p className={styles.info}>Email: {user.email}</p>
              <p className={styles.info}>Followers: {user.followers.total}</p>
              <button onClick={onHandleClick} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          </div>

          <div className={styles.list}>
            <h3 className={styles.title}>Followed Artists</h3>
            <div className={styles.followedArtists}>
              {Object.keys(followedArtist).length > 0 ? (
                followedArtist.map((fArtist) => <Artist artistData={fArtist} />)
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>

          <div>
            <h3 className={styles.title}>Saved Tracks</h3>
            <TrackList />
          </div>

          <div className={styles.albumList}>
            <h3 className={styles.title}>Saved Albums</h3>
            <div className={styles.savedAlbums}>
              {Object.keys(savedAlbums).length > 0 ? (
                savedAlbums.map((sAlbum) => (
                  <Album albumData={sAlbum.album} release_date={false} />
                ))
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>

          <div className={styles.playlists}>
            <h3 className={styles.title}>Saved Playlists</h3>
            <div className={styles.savedPlaylists}>
              {Object.keys(savedPlaylists).length > 0 ? (
                savedPlaylists.map((sPlaylist) => (
                  <Album
                    albumData={sPlaylist}
                    artist={false}
                    release_date={false}
                  />
                ))
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </MainLayout>
  );
}
