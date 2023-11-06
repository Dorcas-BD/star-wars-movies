import React from "react";
import { Link } from "react-router-dom";

const MovieDetail = () => {
  return (
    <div>
      <h1>Hello World, My name is Dorcas</h1>
      <p>The Movie Detail Page will be available soon</p>
      <Link to="/" className="view-btn">
        Go back to home
      </Link>
    </div>
  );
};

export default MovieDetail;
