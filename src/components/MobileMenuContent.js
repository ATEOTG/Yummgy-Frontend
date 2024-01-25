import React, { useEffect, useState } from "react";
import "./MobileMenuContent.css";
import { Link, useLocation } from "react-router-dom";

function MobileMenuContent(props) {
  const [renderLink, setRenderLink] = useState({
    homeRender: false,
    myRecipe: false,
  });

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (
      path === "/recipe" ||
      path === "/login" ||
      path === "/register" ||
      path === "/user"
    ) {
      setRenderLink(() => {
        return {
          allRecipeRender: true,
          homeRender: true,
          myRecipe: props.isUserLogged,
        };
      });
    } else if (path === "/") {
      setRenderLink(() => {
        return {
          allRecipeRender: true,
          homeRender: false,
          myRecipe: props.isUserLogged,
        };
      });
    }
  }, [path, props.isUserLogged]);

  return (
    <div
      className={`${
        props.isCollapse ? "show" : ""
      } mobile-menu-content-cont rounded collapse`}
      id="navbarToggleExternalContent"
    >
      <div className="p-4 d-flex flex-column gap-1">
        {renderLink.homeRender && (
          <Link
            className="text-decoration-none fs-5 text-black rounded"
            to="/"
            onClick={() => props.setIsCollapse(false)}
          >
            Home
          </Link>
        )}

        <Link
          className="text-decoration-none fs-5 text-black rounded"
          to="/recipe"
          onClick={() => props.setIsCollapse(false)}
        >
          All Recipes
        </Link>

        <Link
          className="text-decoration-none fs-5 text-black  rounded"
          to="/accounts"
          onClick={() => props.setIsCollapse(false)}
        >
          Users
        </Link>

        {renderLink.myRecipe && (
          <Link
            className="text-decoration-none fs-5 text-black rounded"
            to="/user"
            onClick={() => props.setIsCollapse(false)}
          >
            My Recipes
          </Link>
        )}
      </div>
    </div>
  );
}

export default MobileMenuContent;
