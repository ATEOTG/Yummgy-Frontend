import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home(props) {
  const logoutHandler = () => {
    sessionStorage.setItem("jwt", "");
    props.setIsUserLogged(false);
    props.setCurrentUserInfo({});
  };

  return (
    <div className="d-flex align-items-stretch gap-3 home-cont-gen">
      <div className="home-cont rounded w-50"></div>

      <div className="d-flex flex-column justify-content-between w-50 home-info-cont">
        {props.isUserLogged ? (
          <button
            onClick={logoutHandler}
            className="btn  btn-lg    home-btn  border border-2 border-black home-logout-btn"
          >
            Logout
          </button>
        ) : (
          <Link
            className="btn  btn-lg    home-btn  border border-2 border-black home-login-btn"
            to="/login"
          >
            Login
          </Link>
        )}

        {!props.isUserLogged && (
          <Link
            className="btn btn-lg py-4 px-3 home-btn border border-2 border-black register-btn-desktop"
            to="/register"
          >
            New User? Register
          </Link>
        )}

        <div className="home-text-cont rounded border border-2 border-black fs-5 text-center">
          <p>Welcome to Yummgy</p>
          <p>Find All your favorite Food Co Recipes and more!</p>
          <p>Add your own recipes, or find new favorites.</p>
        </div>

        {!props.isUserLogged && (
          <Link
            className="btn btn-lg py-4 px-3 home-btn border border-2 border-black register-btn-mobile"
            to="/register"
          >
            New User? Register
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
