import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import MovieLists from "./components/MovieLists";
import Header from "./components/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header />
        <MovieLists />
      </QueryClientProvider>
    </div>
  );
}

export default App;
