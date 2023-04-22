import { useEffect, useState } from "react";
import "./App.css";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_APIKEY}`;
const pageID = `&page=`;
const mainurl = `https://api.unsplash.com/photos/${clientID}`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    let url = `${mainurl}${pageID}${page}`;
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      setPhotos((oldPhotos) => [...oldPhotos, ...data]);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      const innerHeight = window.innerHeight;
      const scrollAmount = window.scrollY;
      const bodyHeight = document.body.scrollHeight;
      const offset = -2;

      if (innerHeight + scrollAmount >= bodyHeight + offset) {
        setPage((oldpage) => oldpage + 1);
      }
    });

    return () => {
      window.removeEventListener("scroll", event);
    };
  }, []);

  return (
    <div className="App">
      <main className="MainSection">
        <article className="search">
          <input type="text" className="searchTF" />
          <button className="searchBtn">Search</button>
        </article>
        <article className="photos">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </article>
      </main>
    </div>
  );
}

export default App;
