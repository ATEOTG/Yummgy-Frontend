import React from "react";
import "./RecipePage.css";

function RecipePage(props) {
  return (
    <div className="recipe-page-cont">
      <div className="d-flex justify-content-between border border-2 border-black rounded recipe-header p-2">
        <h3>{props.title}</h3>
        <h3 style={{ marginRight: "3rem" }}>Prep Time: {props.prepTime}</h3>
      </div>
      <div className="d-flex mt-3 gap-5 recipe-main-page-cont">
        <div className="w-50 d-flex flex-column gap-4">
          <img
            className="border border-2 border-black rounded w-100 h-50"
            src={props.image}
            alt={`${props.title}`}
          />
          <div className="border border-2 border-black rounded ingredients-cont h-50 p-2">
            <p className="fw-bold">Ingredients </p>
            <br />
            <p>{props.ingredients}</p>
          </div>
        </div>
        <div className="border border-2 border-black rounded w-50 directions-cont p-2">
          <p className="fw-bold">Directions </p>
          <br />
          <p>{props.directions}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
