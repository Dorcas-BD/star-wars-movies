import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchMovieDetail = async (movieId) => {
  // Replace this with your actual API endpoint to fetch movie details
  const response = await fetch(`https://api.example.com/movies/${movieId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const MovieDetail = () => {
  const { movieId } = useParams();

  const { data, isLoading, error } = useQuery(["movie", movieId], () =>
    fetchMovieDetail(movieId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const movie = data; // Replace with the actual structure of your movie data

  return (
    <div>
      <h2>Movie Detail</h2>
      <h3>{movie.title}</h3>
      <p>Release Date: {movie.release_date}</p>
      {/* Display other detailed movie information here */}
    </div>
  );
};

export default MovieDetail;
