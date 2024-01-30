import React, { Fragment, useRef, useState } from "react";
import "./Register.css";
import YummgyApi from "../../../apis/YummgyApi";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerFailure, setRegisterFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (
        confirmPasswordRef.current.value === "" ||
        passwordRef.current.value === "" ||
        usernameRef.current.value === "" ||
        emailRef.current.value === ""
      ) {
        throw new Error(
          "Username, Email, Password, or Confirm Password cannot be Blank!"
        );
      } else if (
        confirmPasswordRef.current.value !== passwordRef.current.value
      ) {
        throw new Error("Password and Confirm Password do not Match!");
      } else if (
        !emailRef.current.value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        throw new Error(
          "Email not properly formatted as it should! Example: email@gmail.com"
        );
      }

      await YummgyApi.registerUser({
        yumUsername: usernameRef.current.value,
        yumPassword: passwordRef.current.value,
        email: emailRef.current.value,
      });

      setRegisterSuccess(true);
      setTimeout(() => {
        setRegisterSuccess(false);
        navigate("/login", { replace: true });
      }, 4000);
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
    <Fragment>
      <div className="border border-2 border-black rounded p-3 login-cont">
        <form onSubmit={registerSubmitHandler}>
          <div className="d-flex gap-4 mb-3 register-text-cont">
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
          <div className="d-flex gap-4 mb-3 register-text-cont">
            <label
              htmlFor="email"
              className="border border-2 border-black rounded login-label fs-4 text-center py-1"
            >
              Email
            </label>
            <input
              className="form-control border border-2 border-black rounded"
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email..."
              pattern=".+@example\.com"
              required
            />
          </div>
          <div className="d-flex gap-4 mb-3 register-text-cont">
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
          <div className="d-flex gap-4 register-text-cont">
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
              ref={confirmPasswordRef}
              placeholder="Re-enter your Password..."
              required
            />
          </div>
          <div className="d-flex justify-content-center mt-5 w-90 m-auto">
            <button
              type="submit"
              onClick={registerSubmitHandler}
              className="border border-2 border-black rounded p-3 px-5 fs-5 register-btn"
            >
              Register
            </button>
          </div>
        </form>
        {registerSuccess && (
          <div className="w-100 d-flex justify-content-center mt-4">
            <div className="alert alert-success w-50 text-center" role="alert">
              A verification email has been sent to {emailRef.current.value},
              click on it to activate your account!
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
      </div>
      <div className="d-flex justify-content-center mt-2 w-90 m-auto">
        <button
          type="submit"
          onClick={registerSubmitHandler}
          className="border border-2 border-black rounded p-3 px-5 fs-5 register-btn-mobile"
        >
          Register
        </button>
      </div>
    </Fragment>
  );
}

export default Register;
