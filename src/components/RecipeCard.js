import React, { Fragment, useEffect, useState } from "react";
import "./RecipeCard.css";
import { Link, Route, Routes } from "react-router-dom";
import RecipePage from "./pages/RecipePage";
import FavIcon from "../svg/FavIcon";
import YummgyApi from "../apis/YummgyApi";
import UpdateModal from "./modals/UpdateModal";
import NumberFavorited from "./NumberFavorited";

function RecipeCard(props) {
  const [favorite, setFavorite] = useState(false);
  const [userFavoritedList, setUserFavoritedList] = useState([]);
  const [userRecipeModal, setUserRecipeModal] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({
    prepTime: props.prepTime,
    directions: props.directions,
    title: props.title,
    ingredients: props.ingredients,
    foodImageUrl: props.image,
    author: props.author,
  });

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

  useEffect(() => {
    YummgyApi.getRecipeFavoritedList(setUserFavoritedList, props.id);
  }, []);

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
  const updatedValueHandler = (updatedObj) => {
    setRecipeInfo(updatedObj);
  };

  return (
    <Fragment>
      {props.notInRecipePage && (
        <li className="list-unstyled p-3 d-flex gap-4 border border-2 border-black rounded recipe-card">
          <Link className="w-50" to={`${pathName}`}>
            <img
              src={recipeInfo.foodImageUrl}
              alt={`${recipeInfo.title}`}
              className="w-100 border border-2 border-black rounded recipe-card-img"
            />
          </Link>

          <div className="border border-2 border-black rounded recipe-card-text-cont p-3  position-relative">
            <NumberFavorited
              numberOfUsersWhoFavorited={userFavoritedList.length}
              title={recipeInfo.title}
              userlist={userFavoritedList}
              userId={props.userId}
            />
            {props.isAdmin && (
              <button
                onClick={() => {
                  props.deleteRecipeHandler(props.id);
                }}
                className="del-btn del-btn-2 border border-2 border-black rounded"
              >
                Delete
              </button>
            )}

            {props.isAdmin && (
              <button
                onClick={() => setUserRecipeModal(true)}
                className="edit-btn edit-btn-2 border border-2 border-black rounded"
              >
                Edit
              </button>
            )}

            <UpdateModal
              id={props.id}
              title={recipeInfo.title}
              ingredients={recipeInfo.ingredients}
              image={recipeInfo.foodImageUrl}
              directions={recipeInfo.directions}
              prepTime={recipeInfo.prepTime}
              show={userRecipeModal}
              updatedValueHandler={updatedValueHandler}
              onHide={() => setUserRecipeModal(false)}
              isAdmin={props.isAdmin}
            />

            <FavIcon
              className={"recipe-card-icon"}
              favoriteHandler={props.favoriteHandler}
              clickHandler={clickFavoriteHandler}
              favorite={favorite}
            />
            <h2 className="text-center fw-bold mobile-title">
              {recipeInfo.title.length < 20
                ? recipeInfo.title
                : recipeInfo.title.substring(0, 20) + "..."}
            </h2>
            <h2 className="text-center fw-bold tablet-title">
              {recipeInfo.title.length < 25
                ? recipeInfo.title
                : recipeInfo.title.substring(0, 25) + "..."}
            </h2>
            <h2 className="text-center fw-bold desktop-title">
              {recipeInfo.title}
            </h2>
            <div className="mt-4">
              <div className="ingredients-cont text-center">
                <p className="text-center-desktop">
                  Ingredients:{" "}
                  {recipeInfo.ingredients.length < 350
                    ? recipeInfo.ingredients
                    : recipeInfo.ingredients.substring(0, 350) + "..."}
                </p>
                <p className="text-center-tablet">
                  Ingredients:{" "}
                  {recipeInfo.ingredients.length < 140
                    ? recipeInfo.ingredients
                    : recipeInfo.ingredients.substring(0, 140) + "..."}
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
              title={recipeInfo.title}
              prepTime={recipeInfo.prepTime}
              author={recipeInfo.author}
              image={recipeInfo.foodImageUrl}
              ingredients={recipeInfo.ingredients}
              directions={recipeInfo.directions}
            />
          }
        />
      </Routes>
    </Fragment>
  );
}

export default RecipeCard;
