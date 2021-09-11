import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const PHOTOS_PER_PAGE = 6;

const clientID = `?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;
const perPage = `&per_page=${PHOTOS_PER_PAGE}`;
const imagesUrl = "https://api.unsplash.com/photos";
const searchUrl = "https://api.unsplash.com/search/photos";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;

    const pageNum = `&page=${page}`;
    const queryTerm = `&query=${query}`;

    if (!query) {
      url = `${imagesUrl}${clientID}${pageNum}${perPage}`;
    } else {
      url = `${searchUrl}${clientID}${pageNum}${perPage}${queryTerm}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    setPhotos((oldPhotos) => {
      console.log(data);
      if (query && page === 1) {
        return data.results;
      } else if (query) {
        return [...oldPhotos, ...data.results];
      } else {
        return [...oldPhotos, ...data];
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    console.log("Fetching images");
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const scrollEvent = window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight + 10 >
        document.body.scrollHeight
      ) {
        if (!loading) {
          setPage((oldPage) => {
            if (oldPage === 1 || oldPage === 0) {
              return 2;
            }
            return oldPage + 1;
          });
        }
      }
    });
    return () => window.removeEventListener("scroll", scrollEvent);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === 1) setPage(0);
    else setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photo-grid">
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
      </section>
      {loading && <h2 className="loading">Loading...</h2>}
    </main>
  );
};

export default App;
