import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../App.css";
import Header from "../components/Header";
import MovieLists from "../components/MovieLists";

const queryClient = new QueryClient();

const HomePage = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header />
        <MovieLists />
      </QueryClientProvider>
    </div>
  );
};

export default HomePage;
