import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Header from "./components/Header";
import MovieLists from "./components/MovieLists";

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
