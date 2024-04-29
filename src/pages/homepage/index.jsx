import MainLayout from "@/layouts/mainLayout";
import Navbar from "@/components/navbar";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import AudioPlayer from "../../../public/AudioPlayer.svg";
import ArtistList from "@/components/artistList";
import AlbumsList from "@/components/albumsList";

export default function Home() {
  return (
    <MainLayout>
      <Navbar />
      <header className={styles.header}>
        <h1 className={styles.title}>
          Find the <span className={styles.span}>best</span> music for you
        </h1>
        <Image src={AudioPlayer} alt="image" className={styles.image}></Image>
      </header>
      <ArtistList />
      <AlbumsList />
    </MainLayout>
  );
}
