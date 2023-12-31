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
  const [isUserLogged, setIsUserLogged] = useState(() => {
    return sessionStorage.getItem("jwt") ? true : false;
  });

  return (
    <div>
      <header>
        <div className="border border-2 p-2 w-95 rounded m-auto mt-4 title-cont border-black">
          <h1 className="text-center fw-bold">Yummgy</h1>
        </div>

        <Navigation
          isUserLogged={isUserLogged}
          setIsUserLogged={setIsUserLogged}
        />
      </header>
      <main className="w-95 mt-4 m-auto mb-4">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isUserLogged={isUserLogged}
                setIsUserLogged={setIsUserLogged}
              />
            }
            exact
          />
          <Route
            path="/recipe/*"
            element={
              <AllRecipes
                isUserLogged={isUserLogged}
                setIsUserLogged={setIsUserLogged}
              />
            }
          />
          <Route path="/user" element={<UserPage />} />
          <Route
            path="/login"
            element={<Login setIsUserLogged={setIsUserLogged} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
