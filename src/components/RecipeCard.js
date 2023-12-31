import React, { Fragment, useEffect, useState } from "react";
import "./RecipeCard.css";
import { Link, Route, Routes } from "react-router-dom";
import RecipePage from "./pages/RecipePage";
import FavIcon from "../svg/FavIcon";
import YummgyApi from "../apis/YummgyApi";

function RecipeCard(props) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    let isFavorite = false;

    for (let i = 0; i < props.favoriteRecipes.length; i++) {
      if (props.id === props.favoriteRecipes[i].recipe.recipeId) {
        isFavorite = true;
        break;
      }
    }

    setFavorite(isFavorite);
  }, [props.favoriteRecipes, props.id]);

  const pathName = props.title.toLocaleLowerCase().split(" ").join("_");

  const clickFavoriteHandler = () => {
    if (props.isUserLogged) {
      setFavorite(!favorite);

      if (!favorite) {
        YummgyApi.addFavorite(props.id);
      } else {
        YummgyApi.deleteFavorite(props.id);
      }
    } else {
      alert("You must be a user to favorite a recipe!");
    }
  };
  return (
    <Fragment>
      {props.notInRecipePage && (
        <li className="list-unstyled p-3 d-flex gap-4 border border-2 border-black rounded recipe-card">
          <Link className="w-50" to={`${pathName}`}>
            <img
              src={props.image}
              alt={`${props.title}`}
              className="w-100 border border-2 border-black rounded"
            />
          </Link>

          <div className="border border-2 border-black rounded recipe-card-text-cont p-3  position-relative">
            <FavIcon
              className={"recipe-card-icon"}
              favoriteHandler={props.favoriteHandler}
              clickHandler={clickFavoriteHandler}
              favorite={favorite}
            />
            <h2 className="text-center fw-bold tablet-title">
              {props.title.length < 25
                ? props.title
                : props.title.substring(0, 25) + "..."}
            </h2>
            <h2 className="text-center fw-bold desktop-title">{props.title}</h2>
            <div className="mt-4">
              <div className="ingredients-cont">
                <p className="text-center">
                  Ingredients:{" "}
                  {props.ingredients.length < 350
                    ? props.ingredients
                    : props.ingredients.substring(0, 350) + "..."}
                </p>
              </div>
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
