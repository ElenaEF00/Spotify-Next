import Head from "next/head";
import styles from "../styles/Login.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Spotify_logo from "../assets/SpotifyLogoWhite.png";

export default function Login() {
  const clientID = "cd5bbd3f624048e2b1ff9601cfdfa93b";
  const redirect = "http://localhost:3000";
  const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
  const resType = "token";

  const router = useRouter("");

  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((element) => element.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
      window.history.pushState({}, null, "/");
      router.push("/homepage");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Spotify Next</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://img.icons8.com/ios-filled/50/1DB954/spotify.png"
          alt="spotify"
        />
      </Head>
      <div className={styles.login}>
        <div className={styles.color}></div>
        <div className={styles.Intro}>
          <Image
            src={Spotify_logo}
            alt="spotify logo"
            className={styles.logo}
          ></Image>
        </div>
        <div className={styles.info}></div>
        <div className={styles.MainInfo}>
          <h2 className={styles.text}>
            Esplora nuovi ritmi e scopri le tue canzoni preferite su Spotify!{" "}
            <span>Accedi ora</span> per un'esperienza musicale senza confini
          </h2>
          {!token ? (
            <Link
              className={styles.loginBtn}
              href={`${AUTH_ENDPOINT}?client_id=${clientID}&redirect_uri=${redirect}&response_type=${resType}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-follow-read`}
            >
              Login
            </Link>
          ) : (
            <button>Logout</button>
          )}
        </div>
      </div>
    </>
  );
}