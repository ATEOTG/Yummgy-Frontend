import React, { Fragment, useEffect, useRef, useState } from "react";
import SearchIcon from "../../svg/SearchIcon";
import "./AllRecipes.css";
import RecipeCard from "../RecipeCard";
import { useLocation } from "react-router-dom";
import YummgyApi from "../../apis/YummgyApi";
import DropdownMenu from "../DropdownMenu";
import AscendingRadioButtons from "../AscendingRadioButtons";

function AllRecipes(props) {
  const searchInputRef = useRef(null);
  const [recipeList, setRecipeList] = useState([]);
  const [notInRecipePage, setNotInRecipePage] = useState(true);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isAscending, setIsAscending] = useState(false);
  const [placeholder, setPlaceholder] = useState([]);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path.includes("/recipe/")) {
      setNotInRecipePage(false);
    } else {
      setNotInRecipePage(true);
    }
  }, [path]);

  useEffect(() => {
    YummgyApi.searchRecipesAll(setRecipeList);
    if (props.isUserLogged) {
      YummgyApi.getLoggedInUserFavoriteRecipes(
        setFavoriteRecipes,
        setPlaceholder
      );
    }
  }, [props.isUserLogged]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (props.isUserLogged) {
      YummgyApi.getLoggedInUserFavoriteRecipes(
        setFavoriteRecipes,
        setPlaceholder
      );
    }

    YummgyApi.searchRecipes(
      "recipeId",
      isAscending,
      15,
      searchInputRef.current.value,
      setRecipeList
    );
  };

  const deleteRecipeHandler = (id) => {
    setRecipeList(() => {
      return recipeList.filter((el) => {
        return el.recipeId !== id;
      });
    });
    YummgyApi.deleteRecipeAdmin(id);
  };

  const sortByPrepTime = () => {
    if (props.isUserLogged) {
      YummgyApi.getLoggedInUserFavoriteRecipes(
        setFavoriteRecipes,
        setPlaceholder
      );
    }
    YummgyApi.searchRecipes(
      "prepTime",
      isAscending,
      15,
      searchInputRef.current.value,
      setRecipeList
    );
  };

  const sortByFavorites = () => {
    if (props.isUserLogged) {
      YummgyApi.getLoggedInUserFavoriteRecipes(
        setFavoriteRecipes,
        setPlaceholder
      );
    }
    YummgyApi.searchRecipes(
      "favoriteCount",
      isAscending,
      15,
      searchInputRef.current.value,
      setRecipeList
    );
  };

  const sortByTitle = () => {
    if (props.isUserLogged) {
      YummgyApi.getLoggedInUserFavoriteRecipes(
        setFavoriteRecipes,
        setPlaceholder
      );
    }
    YummgyApi.searchRecipes(
      "title",
      isAscending,
      15,
      searchInputRef.current.value,
      setRecipeList
    );
  };

  return (
    <div className="d-flex">
      <div className="w-100">
        {notInRecipePage && (
          <Fragment>
            <form
              className="input-group search-form d-flex align-items-center gap-2"
              onSubmit={onSubmitHandler}
            >
              <SearchIcon />
              <input
                className="form-control border border-2 border-black rounded-pill text-input"
                type="text"
                ref={searchInputRef}
                name="search"
                placeholder="Search for Recipe..."
              />
            </form>
            <div className="d-flex justify-content-start gap-4">
              <DropdownMenu
                sortByPrepTime={sortByPrepTime}
                sortByFavorites={sortByFavorites}
                sortByTitle={sortByTitle}
              />
              <AscendingRadioButtons
                setIsAscending={setIsAscending}
                isAscending={isAscending}
              />
            </div>
          </Fragment>
        )}

        <ul className="mt-5 d-flex flex-column p-0 gap-4">
          {recipeList.length !== 0 ? (
            recipeList.map((recipe, i) => {
              return (
                <RecipeCard
                  key={`${recipe.recipeId} + ${i}`}
                  userId={props.currUserInfo.userId}
                  id={recipe.recipeId}
                  title={recipe.title}
                  prepTime={recipe.prepTime}
                  author={recipe.author}
                  image={recipe.foodImageUrl}
                  ingredients={recipe.ingredients}
                  directions={recipe.directions}
                  notInRecipePage={notInRecipePage}
                  favoriteRecipes={favoriteRecipes}
                  isUserLogged={props.isUserLogged}
                  isAdmin={props.currUserInfo.role === "ROLE_ADMIN"}
                  deleteRecipeHandler={deleteRecipeHandler}
                />
              );
            })
          ) : (
            <h2 className="fw-bold text-center">No Results Found!</h2>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AllRecipes;
