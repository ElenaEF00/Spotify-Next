import MainLayout from "@/layouts/mainLayout";
import styles from "../../styles/Search.module.scss";
import Navbar from "@/components/navbar";
import SearchInput from "@/components/searchInput";
import CategoriesList from "@/components/categoriesList";
import { useState } from "react";
import Album from "@/components/album";
import Artist from "@/components/artist";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const hasSearchResults =
    Object.keys(searchResults).length > 0 &&
    (searchResults.artists.items.length > 0 ||
      searchResults.albums.items.length > 0);

  const hasArtists = hasSearchResults && searchResults.artists.items.length > 0;
  const hasAlbums = hasSearchResults && searchResults.albums.items.length > 0;

  return (
    <MainLayout>
      <Navbar />
      <SearchInput
        setSearchResults={setSearchResults}
        setIsLoading={setIsLoading}
      />
      {isLoading && <div class="loader"></div>}

      {!hasSearchResults && <CategoriesList />}

      <div className={styles.resultsPage}>
        {hasArtists && (
          <div className={styles.results}>
            <h4>Artisti</h4>
            <div className={styles.searchResults}>
              {searchResults.artists.items.map((artist, key) => (
                <Artist artistData={artist} key={key} id={key} />
              ))}
            </div>
          </div>
        )}
        {hasAlbums && (
          <div className={styles.results}>
            <h4>Albums</h4>
            <div className={styles.searchResults}>
              {searchResults.albums.items.map((album, key) => (
                <Album albumData={album} key={key} id={key} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
