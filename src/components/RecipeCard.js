import React from "react";

function RecipeCard(props) {
  return (
    <li className="w-25 list-unstyled d-inline-block">
      <img src={props.image} alt={`${props.name}`} className="w-100" />
      <div>
        <h2 className="text-center fw-bold">{props.title}</h2>
        <div className="mt-4">
          <p className="text-center">Prep Time: {props.prepTime}</p>
          <div>
            <p className="text-center">Ingredients: {props.ingredients}</p>
          </div>

          <p className="text-center">Author: {props.author}</p>
        </div>
      </div>
    </li>
  );
}

export default RecipeCard;
