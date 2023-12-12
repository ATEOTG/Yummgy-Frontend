import React from "react";
import { Link } from "react-router-dom";

function Navigation(props) {
  return (
    <nav className="nav nav-pills nav-fill border border-2 w-95 m-auto rounded p-2 d-flex gap-4 mt-3">
      <Link
        className="text-decoration-none fs-4 text-black border border-2 px-5 py-2 rounded"
        to="/"
      >
        Home
      </Link>

      <Link
        className="text-decoration-none fs-4 text-black border border-2 px-5 py-2 rounded"
        to="/recipe"
      >
        All Recipes
      </Link>
    </nav>
  );
}

export default Navigation;
