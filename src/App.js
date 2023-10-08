import "./App.css";
import Header from "./components/Header";
import MovieLists from "./components/MovieLists";

function App() {
  fetch("https://swapi.dev/api/films").then((res) =>
    res.json().then((movie) => console.log(movie))
  );

  return (
    <div className="App">
      <Header />
      <MovieLists />
    </div>
  );
}

export default App;
