import React, { Fragment } from "react";
import "./RecipeCard.css";
import { Link, Route, Routes } from "react-router-dom";
import RecipePage from "./RecipePage";

function RecipeCard(props) {
  const pathName = props.title.toLocaleLowerCase().split(" ").join("_");

  return (
    <Fragment>
      {props.notInRecipePage && (
        <li className="list-unstyled p-3 d-flex gap-4 border border-2 border-black rounded recipe-card">
          <Link className="w-50" to={`${pathName}`}>
            <img
              src={props.image}
              alt={`${props.title}`}
              className="w-100 h-100 border border-2 border-black rounded"
            />
          </Link>

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
      )}
      <Routes>
        <Route
          path={`${pathName}`}
          element={
            <RecipePage
              title={props.title}
              prepTime={props.prepTime}
              author={props.author}
              image={props.image}
              ingredients={props.ingredients}
              directions={props.directions}
            />
          }
        />
      </Routes>
    </Fragment>
  );
}

export default RecipeCard;
