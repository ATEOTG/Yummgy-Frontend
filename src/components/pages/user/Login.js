import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import YummgyApi from "../../../apis/YummgyApi";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailure, setLoginFailure] = useState(false);

  const navigate = useNavigate();

  const usernameValueHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordValueHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    if (username !== "" || password !== "") {
      YummgyApi.loginUser(
        { username: username, password: password },
        props.setJwt
      );
    }

    // setLoginSuccess(true);
    if (true) {
      setTimeout(() => {
        // setLoginSuccess(false);
        navigate("/user", { replace: true });
      }, 1000);
    }
  };

  return (
    <div className="border border-2 border-black rounded p-3 login-cont">
      <form onSubmit={loginSubmitHandler}>
        <div className="d-flex gap-4 mb-3">
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
            value={username}
            placeholder="Enter your Username..."
            onChange={usernameValueHandler}
            required
          />
        </div>
        <div className="d-flex gap-4">
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
            value={password}
            placeholder="Enter your Password..."
            onChange={passwordValueHandler}
            required
          />
        </div>
      </form>
      {loginSuccess && (
        <div className="w-100 d-flex justify-content-center mt-4">
          <div className="alert alert-success w-50 text-center" role="alert">
            Login Successful!
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center mt-4 w-90 m-auto">
        <button
          onClick={loginSubmitHandler}
          className="border border-2 border-black rounded p-3 px-5 fs-5 login-btn"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
