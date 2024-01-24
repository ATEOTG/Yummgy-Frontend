import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import AllRecipes from "./components/pages/AllRecipes";
import Navigation from "./components/Navigation";
import Login from "./components/pages/user/Login";
import Register from "./components/pages/user/Register";
import NotFound from "./components/pages/NotFound";
import UserPage from "./components/pages/user/UserPage";
import { useEffect, useState } from "react";
import AccountsPage from "./components/pages/AccountsPage";
import YummgyApi from "./apis/YummgyApi";
import PersonIcon from "./svg/PersonIcon";
import HamburgerIcon from "./svg/HamburgerIcon";
import MobileMenu from "./components/MobileMenu";
import MobileMenuContent from "./components/MobileMenuContent";

function App() {
  const [isUserLogged, setIsUserLogged] = useState(() => {
    return sessionStorage.getItem("jwt") ? true : false;
  });
  const [currUserInfo, setCurrentUserInfo] = useState({});
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    if (isUserLogged) {
      YummgyApi.getLoggedInUser(setCurrentUserInfo);
    }
  }, []);
  return (
    <div>
      <header>
        <div className="border border-2 p-2 w-95 rounded m-auto mt-4 title-cont border-black">
          <MobileMenu setIsCollapse={setIsCollapse} />
          <h1 className="text-center fw-bold">Yummgy</h1>
          <PersonIcon />
        </div>
        <MobileMenuContent
          isUserLogged={isUserLogged}
          setIsCollapse={setIsCollapse}
          isCollapse={isCollapse}
        />
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
                setCurrentUserInfo={setCurrentUserInfo}
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
                currUserInfo={currUserInfo}
              />
            }
          />
          <Route
            path="/user"
            element={<UserPage isUserLogged={isUserLogged} />}
          />
          <Route
            path="/login"
            element={
              <Login
                setIsUserLogged={setIsUserLogged}
                setCurrentUserInfo={setCurrentUserInfo}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/accounts/*"
            element={
              <AccountsPage
                isUserLogged={isUserLogged}
                currUserInfo={currUserInfo}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
