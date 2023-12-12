import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div className="d-flex align-items-stretch gap-3">
      <div className="home-cont rounded w-50"></div>

      <div className="d-flex flex-column justify-content-between w-50">
        <Link
          className="btn  btn-lg    home-btn  border border-2 border-black"
          to="/user/login"
        >
          Login
        </Link>
        <Link
          className="btn btn-lg py-4 px-3 home-btn border border-2 border-black"
          to="#"
        >
          New User? Register
        </Link>
        <div className="home-text-cont rounded border border-2 border-black fs-5 text-center">
          <p>Welcome to Yummgy</p>
          <p>Find All your favorite Food Co Recipes and more!</p>
          <p>Add your own recipes, or find new favorites.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
