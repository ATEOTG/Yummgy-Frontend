import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const usernameValueHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordValueHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    // testing out
    if (true) {
      setTimeout(() => {
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
