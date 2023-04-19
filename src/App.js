import "./App.css";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_APIKEY}`;
const url = "https://api.unsplash.com/photos/";

function App() {
  return (
    <div className="App">
      <main className="MainSection">
        <article className="search">
          <input type="text" className="searchTF" />
          <button className="searchBtn">Search</button>
        </article>
        <article className="photos">
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
        </article>
      </main>
    </div>
  );
}

export default App;
