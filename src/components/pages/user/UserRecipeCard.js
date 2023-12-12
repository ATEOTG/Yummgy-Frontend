import React from "react";
import "./UserRecipeCard.css";

function UserRecipeCard(props) {
  return (
    <li className="list-unstyled p-3 d-flex gap-2 border border-2 border-black rounded recipe-card w-100">
      <img
        src={props.image}
        alt={`${props.title}`}
        className="w-50 h-50 border border-2 border-black rounded"
      />

      <div className="border border-2 border-black rounded recipe-card-text-cont position-relative d-flex justify-content-center">
        <h4 className="text-center fw-bold mt-3 overflow-hidden user-recipe-title">
          {props.title}
        </h4>
      </div>
    </li>
  );
}

export default UserRecipeCard;
