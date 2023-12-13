import React, { useState } from "react";
import "./Register.css";
import YummgyApi from "../../../apis/YummgyApi";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerFailure, setRegisterFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const usernameValueHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordValueHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const registerSubmitHandler = (e) => {
    e.preventDefault();

    try {
      if (confirmPassword === "" || password === "" || username === "") {
        throw new Error(
          "Username, Password, or Confirm Password cannot be Blank!"
        );
      } else if (confirmPassword !== password) {
        throw new Error("Password and Confirm Password do not Match!");
      }

      YummgyApi.registerUser({
        yumUsername: username,
        yumPassword: password,
      });

      setUsername("");
      setPassword("");
      setConfirmPassword("");

      setRegisterSuccess(true);
      setTimeout(() => {
        setRegisterSuccess(false);
        navigate("/login", { replace: true });
      }, 2000);
    } catch (err) {
      const errorMessage = err.message;
      setErrorMessage(errorMessage);
      setRegisterFailure(true);
      setTimeout(() => {
        setRegisterFailure(false);
      }, 3000);
    }
  };

  return (
    <div className="border border-2 border-black rounded p-3 login-cont">
      <form onSubmit={registerSubmitHandler}>
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
        <div className="d-flex gap-4 mb-3">
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
        <div className="d-flex gap-4">
          <label
            htmlFor="password"
            className="border border-2 border-black rounded login-label fs-4 text-center py-1"
          >
            Re-enter Password
          </label>
          <input
            className="form-control border border-2 border-black rounded"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Re-enter your Password..."
            onChange={confirmPasswordHandler}
            required
          />
        </div>
      </form>
      {registerSuccess && (
        <div className="w-100 d-flex justify-content-center mt-4">
          <div className="alert alert-success w-50 text-center" role="alert">
            Successfully Registered!
          </div>
        </div>
      )}

      {registerFailure && (
        <div className="w-100 d-flex justify-content-center mt-4">
          <div className="alert alert-danger w-50 text-center" role="alert">
            {errorMessage}
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center mt-5 w-90 m-auto">
        <button
          onClick={registerSubmitHandler}
          className="border border-2 border-black rounded p-3 px-5 fs-5 register-btn"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
