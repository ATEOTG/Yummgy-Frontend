import React, { Fragment, useRef, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import YummgyApi from "../../../apis/YummgyApi";

function Login(props) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailure, setLoginFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const navigate = useNavigate();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      setFailureMessage("Cannot leave fields blank!");
      setLoginFailure(true);
      setTimeout(() => {
        setLoginFailure(false);
      }, 2000);
      return;
    }

    try {
      await YummgyApi.loginUser(
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        },
        props.setIsUserLogged
      );

      YummgyApi.getLoggedInUser(props.setCurrentUserInfo);

      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        navigate("/user", { replace: true });
      }, 2000);
    } catch (err) {
      setFailureMessage("Username and Password Do Not Match.");
      setLoginFailure(true);
      setTimeout(() => {
        setLoginFailure(false);
      }, 2000);
    }
  };

  return (
    <Fragment>
      <div className="border border-2 border-black rounded p-3 login-cont">
        <form onSubmit={loginSubmitHandler}>
          <div className="d-flex gap-4 mb-3 login-text-cont">
            <label
              htmlFor="username"
              className="border border-2 border-black rounded login-label fs-4 text-center py-1"
            >
              Username
            </label>
            <input
              className="form-control border border-2 border-black rounded"
              type="text"
              id="username"
              name="username"
              ref={usernameRef}
              placeholder="Enter your Username..."
              required
            />
          </div>
          <div className="d-flex gap-4 login-text-cont">
            <label
              htmlFor="password"
              className="border border-2 border-black rounded login-label fs-4 text-center py-1"
            >
              Password
            </label>
            <input
              className="form-control border border-2 border-black rounded"
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              placeholder="Enter your Password..."
              required
            />
          </div>
          <div className="d-flex justify-content-center mt-4 w-90 m-auto">
            <button
              onClick={loginSubmitHandler}
              className="border border-2 border-black rounded p-3 px-5 fs-5 login-btn"
            >
              Login
            </button>
          </div>
        </form>
        {loginSuccess && (
          <div className="w-100 d-flex justify-content-center mt-4">
            <div className="alert alert-success w-50 text-center" role="alert">
              Login Successful!
            </div>
          </div>
        )}

        {loginFailure && (
          <div className="w-100 d-flex justify-content-center mt-4">
            <div className="alert alert-danger w-50 text-center" role="alert">
              {failureMessage}
            </div>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4 w-90 m-auto login-btn-mobile">
        <button
          onClick={loginSubmitHandler}
          className="border border-2 border-black rounded p-3 px-5 fs-5"
        >
          Login
        </button>
      </div>

      <Link
        className="btn btn-lg py-4 home-btn border border-2 border-black register-btn-mobile-login"
        to="/register"
      >
        New User? Register Here
      </Link>
    </Fragment>
  );
}

export default Login;
