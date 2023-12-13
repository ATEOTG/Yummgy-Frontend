import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import AllRecipes from "./components/pages/AllRecipes";
import Navigation from "./components/Navigation";
import Login from "./components/pages/user/Login";
import Register from "./components/pages/user/Register";
import NotFound from "./components/pages/NotFound";
import UserPage from "./components/pages/user/UserPage";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});

  return (
    <div>
      <header>
        <div className="border border-2 p-2 w-95 rounded m-auto mt-4 title-cont border-black">
          <h1 className="text-center fw-bold">Yummgy</h1>
        </div>

        <Navigation user={user} setUser={setUser} />
      </header>
      <main className="w-95 mt-4 m-auto mb-4">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route
            path="/recipe/*"
            element={<AllRecipes user={user} setUser={setUser} />}
          />
          <Route
            path="/user"
            element={<UserPage user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
