import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home(props) {
  const logoutHandler = () => {
    sessionStorage.setItem("jwt", "");
    props.setIsUserLogged(false);
  };

  return (
    <div className="d-flex align-items-stretch gap-3">
      <div className="home-cont rounded w-50"></div>

      <div className="d-flex flex-column justify-content-between w-50">
        {props.isUserLogged ? (
          <button
            onClick={logoutHandler}
            className="btn  btn-lg    home-btn  border border-2 border-black"
          >
            Logout
          </button>
        ) : (
          <Link
            className="btn  btn-lg    home-btn  border border-2 border-black"
            to="/login"
          >
            Login
          </Link>
        )}

        <Link
          className="btn btn-lg py-4 px-3 home-btn border border-2 border-black"
          to="/register"
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
