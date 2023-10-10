import React, { useState } from "react";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";

const MovieLists = () => {
  const [movies, setMovies] = useState([]);
  const [trailerVideoIds, setTrailerVideoIds] = useState({});
  const [loading, setLoading] = useState(true);
  const [showFullCrawl, setShowFullCrawl] = useState(false);

  const apiKey = "AIzaSyC-hua-HLvBvx0NDWsyeEtOlvIhnYMY7nw";

  const fetchTrailer = async (movieTitle) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${movieTitle} trailer&type=video&maxResults=1`
      );
      const data = await response.json();
      const videoId = data.items[0]?.id?.videoId;
      setTrailerVideoIds((prevIds) => ({ ...prevIds, [movieTitle]: videoId }));
    } catch (error) {
      console.log("Error fetching trailer:", error);
    }
  };

  // useEffect(() => {
  //   fetch("https://swapi.dev/api/films")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMovies(data.results);
  //       setLoading(false);
  //       data.results.forEach((movie) => {
  //         fetchTrailer(movie.title);
  //       });
  //     });

  // }, []);

  const { isLoading, error } = useQuery({
    queryKey: ["films"],
    queryFn: async () => {
      try {
        const response = await fetch("https://swapi.dev/api/films");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const filmData = await response.json();
        const films = filmData.results;
        setMovies(films);
        setLoading(false);

        films.forEach((movie) => {
          fetchTrailer(movie.title);
        });
        return filmData;
      } catch (error) {
        throw new Error("Error fetching films: ", error);
      }
    },
  });

  if (isLoading) return loading && <Loading />;
  if (error) return "An error has occurred: " + error.message;

  const shortenCrawl = (crawl) => {
    const words = crawl.split(" ");
    if (words.length <= 50) {
      return crawl;
    } else {
      return words.slice(0, 15).join(" ") + " ... ";
    }
  };

  const handleCrawl = (index) => {
    setShowFullCrawl((prevCrawl) => {
      const updatedCrawl = [...prevCrawl];
      updatedCrawl[index] = !updatedCrawl[index];
      return [...updatedCrawl];
    });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.episode_id}>
              <iframe
                src={`https://www.youtube.com/embed/${
                  trailerVideoIds[movie.title]
                }`}
                title="trailer"
                className="trailer-iframe"
              ></iframe>
              <h2>{movie.title}</h2>
              <p>Release Date: {movie.release_date}</p>
              <p>
                {showFullCrawl
                  ? movie.opening_crawl
                  : shortenCrawl(movie.opening_crawl)}
                <span onClick={handleCrawl} className="show-btn">
                  {showFullCrawl ? "Show Less" : "Show More"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieLists;
