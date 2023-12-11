import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AllRecipes from "./components/AllRecipes";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <header className="border border-2 p-2 w-95 rounded m-auto mt-4">
        <h1 className="text-center fw-bold">Yummgy</h1>
      </header>

      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/recipe" element={<AllRecipes />} />
      </Routes>
    </div>
  );
}

export default App;
