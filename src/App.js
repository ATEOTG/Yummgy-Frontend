import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AllRecipes from "./components/AllRecipes";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <header>
        <div className="border border-2 p-2 w-95 rounded m-auto mt-4 title-cont border-black">
          <h1 className="text-center fw-bold">Yummgy</h1>
        </div>

        <Navigation />
      </header>
      <main className="w-95 mt-4 m-auto mb-4">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/recipe" element={<AllRecipes />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
