import React, { useEffect, useState } from "react";
import SearchIcon from "../../svg/SearchIcon";
import "./AllRecipes.css";
import RecipeCard from "../RecipeCard";
import { useLocation } from "react-router-dom";
import YummgyApi from "../../apis/YummgyApi";

function AllRecipes(props) {
  const [searchValue, setSearchValue] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [notInRecipePage, setNotInRecipePage] = useState(true);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
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
    YummgyApi.recipesSortByLatest(setRecipeList);
    if (props.isUserLogged) {
      YummgyApi.getLoggedInUserFavoriteRecipes(
        setFavoriteRecipes,
        setPlaceholder
      );
    }
  }, [props.isUserLogged]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    YummgyApi.searchRecipes(searchValue, setRecipeList);
  };

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
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
    YummgyApi.recipesSortByPrep(setRecipeList);
  };

  console.log("CurrentUserInfo: " + props.currUserInfo.role);

  return (
    <div className="d-flex">
      <div className="w-100">
        {notInRecipePage && (
          <form className="input-group search-form" onSubmit={onSubmitHandler}>
            <SearchIcon />
            <input
              className="form-control border border-2 border-black rounded-pill text-input"
              type="text"
              value={searchValue}
              name="search"
              placeholder="Search for Recipe..."
              onChange={onChangeHandler}
            />
          </form>
        )}
        <div className="d-flex justify-content-center mt-5 w-90 m-auto">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Dropdown
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button
                type="button"
                onClick={sortByPrepTime}
                className="border border-2 border-black rounded p-3 px-5 fs-5 register-btn dropdown-item"
              >
                Sort Recipes by Prep Time
              </button>
              <button className="dropdown-item" type="button">
                Another action
              </button>
              <button className="dropdown-item" type="button">
                Something else here
              </button>
            </div>
          </div>
        </div>

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
