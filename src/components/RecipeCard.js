import React from "react";
import "./RecipeCard.css";

function RecipeCard(props) {
  return (
    <li className="list-unstyled p-3 d-flex gap-4 border border-2 border-black rounded recipe-card">
      <img
        src={props.image}
        alt={`${props.name}`}
        className="w-25 border border-2 border-black rounded"
      />
      <div className="border border-2 border-black rounded recipe-card-text-cont p-3">
        <h2 className="text-center fw-bold">{props.title}</h2>
        <div className="mt-4">
          {/* <p className="text-center">Prep Time: {props.prepTime}</p> */}
          <div>
            <p className="text-center">Ingredients: {props.ingredients}</p>
          </div>

          {/* <p className="text-center">Author: {props.author}</p> */}
        </div>
      </div>
    </li>
  );
}

export default RecipeCard;
