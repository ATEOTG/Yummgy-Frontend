import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  const [renderLink, setRenderLink] = useState({
    homeRender: false,
    allRecipeRender: true,
    myRecipe: false,
  });
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path === "/recipe") {
      setRenderLink(() => {
        return { allRecipeRender: true, homeRender: true, myRecipe: true };
      });
    } else if (path === "/") {
      setRenderLink(() => {
        return { allRecipeRender: true, homeRender: false, myRecipe: false };
      });
    } else if (path === "/user/login" || path === "/user/register") {
      setRenderLink(() => {
        return { allRecipeRender: true, homeRender: true, myRecipe: false };
      });
    }
  }, [path]);

  return (
    <nav className="nav nav-pills nav-fill border border-2 w-95 m-auto rounded p-2 d-flex gap-4 mt-3 justify-content-center nav-cont border-black">
      {renderLink.homeRender && (
        <Link
          className="text-decoration-none fs-4 text-black border border-2 px-5 py-2 rounded nav-links border-black"
          to="/"
        >
          Home
        </Link>
      )}

      {renderLink.allRecipeRender && (
        <Link
          className="text-decoration-none fs-4 text-black border border-2 px-5 py-2 rounded nav-links border-black"
          to="/recipe"
        >
          All Recipes
        </Link>
      )}

      {renderLink.myRecipe && (
        <Link
          className="text-decoration-none fs-4 text-black border border-2 px-5 py-2 rounded nav-links border-black"
          to="#"
        >
          My Recipes
        </Link>
      )}
    </nav>
  );
}

export default Navigation;
