import React from "react";
import "./PersonIcon.css";
import { Link } from "react-router-dom";

function PersonIcon(props) {
  return (
    <Link className="person-icon" to="/login">
      <svg
        width="32px"
        height="32px"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="3"
        stroke="#000000"
        fill="none"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          <circle cx="32" cy="18.14" r="11.14" />

          <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" />
        </g>
      </svg>
    </Link>
  );
}

export default PersonIcon;
