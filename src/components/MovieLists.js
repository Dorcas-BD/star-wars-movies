import React, { useEffect, useState } from "react";

const MovieLists = () => {
  const [movies, setMovies] = useState([]);
  const [trailerVideoIds, setTrailerVideoIds] = useState({});

  const fetchTrailer = async (movieTitle) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${movieTitle} trailer&type=video&maxResults=1`
      );
      const data = await response.json();
      const videoId = data.items[0]?.episode_id?.videoId;
      setTrailerVideoIds((prevIds) => ({ ...prevIds, [movieTitle]: videoId }));
    } catch (error) {
      console.log("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    fetch("https://swapi.dev/api/films")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        data.results.forEach((movie) => {
          fetchTrailer(movie.title);
        });
      });
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.episode_id}>
          <iframe
            width="200"
            height="315"
            src={`https://www.youtube.com/embed/${
              trailerVideoIds[movie.title]
            }`}
            frameBorder="0"
            title="trailer"
          ></iframe>
          <h2>{movie.title}</h2>
          <p>Release Date: {movie.release_date}</p>
          <p>{movie.opening_crawl}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieLists;
