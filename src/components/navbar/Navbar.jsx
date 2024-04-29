import Image from "next/image";
import { CiUser } from "react-icons/ci";
import Spotify_logo from "../../assets/spotify_logo.png";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";

const Navbar = () => {
  const [user, setUser] = useState("");

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

  return (
    <>
      <main className={styles.Navbar}>
        <div className={styles.container}>
          <div>
            <Image
              src={Spotify_logo}
              alt="spotify logo"
              className={styles.logo}
            ></Image>
          </div>
          {Object.keys(user).length > 0 ? (
            <>
              <div>
                <div className={styles.profile}>
                  {user.images.length > 0 ? (
                    <img
                      src={user.images[0].url}
                      className={styles.picture}
                    ></img>
                  ) : (
                    <CiUser />
                  )}
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Navbar;
