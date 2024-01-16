import React from "react";
import "./AccountCard.css";
import { Link } from "react-router-dom";

function AccountCard(props) {
  return (
    <li className="list-unstyled p-3 d-flex gap-4 border border-2 border-black rounded account-card ">
      <div>
        <h5>Id: {props.id}</h5>
        <Link className="text-decoration-none fs-4 text-black username-link">
          <h3>Username: {props.username}</h3>
        </Link>
      </div>
    </li>
  );
}

export default AccountCard;
