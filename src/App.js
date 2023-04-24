import { useEffect, useState } from "react";
import "./App.css";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_APIKEY}`;
const pageID = `&page=`;
const queryParam = `&query=`;
const mainurl = `https://api.unsplash.com/photos/${clientID}`;
const searchUrl = `https://api.unsplash.com/search/photos/${clientID}`;

// ********************************************************************************************
function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  // ********************************************************************************************
  const fetchImages = async () => {
    let url = "";

    if (query) {
      url = `${searchUrl}${pageID}${page}${queryParam}${query}`;
      console.log(url);
    } else {
      url = `${mainurl}${pageID}${page}`;
    }
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (query && page === 1) {
        setPhotos((oldPhotos) => [...data.results]);
      } else if (query) {
        setPhotos((oldPhotos) => [...oldPhotos, ...data.results]);
      } else {
        setPhotos((oldPhotos) => [...oldPhotos, ...data]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  // ********************************************************************************************

  useEffect(() => {
    fetchImages();
  }, [page]);

  // ********************************************************************************************

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      const innerHeight = window.innerHeight;
      const scrollAmount = window.scrollY;
      const bodyHeight = document.body.scrollHeight;
      const offset = -2;
      if (!loading && innerHeight + scrollAmount >= bodyHeight + offset) {
        setPage((oldpage) => oldpage + 1);
      }
    });
    return () => {
      window.removeEventListener("scroll", event);
    };
  }, []);
  // ********************************************************************************************

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };
  // ********************************************************************************************

  return (
    <div className="App">
      <main className="MainSection">
        <article className="search">
          <input
            type="text"
            className="searchTF"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="searchBtn" onClick={handleSearch}>
            Search
          </button>
        </article>
        <article className="photos">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </article>
        {loading && <h2 className="loading">Loading...</h2>}
      </main>
    </div>
  );
}

export default App;
