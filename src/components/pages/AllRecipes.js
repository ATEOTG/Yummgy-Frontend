import React, { Fragment, useEffect, useState } from "react";
import SearchIcon from "../../svg/SearchIcon";
import "./AllRecipes.css";
import RecipeCard from "../RecipeCard";
import { useLocation } from "react-router-dom";
import YummgyApi from "../../apis/YummgyApi";
import DropdownMenu from "../DropdownMenu";
import AscendingRadioButtons from "../AscendingRadioButtons";

function AllRecipes(props) {
  const [searchValue, setSearchValue] = useState("");
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

    YummgyApi.searchRecipes(
      "recipeId",
      isAscending,
      10,
      searchValue,
      setRecipeList
    );
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
          <Fragment>
            <form
              className="input-group search-form d-flex align-items-center"
              onSubmit={onSubmitHandler}
            >
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
           
          </Fragment>
        )}
        <div className="container">
          <div className="row"> 
            <div className="col col-sm-auto">
            <DropdownMenu sortByPrepTime={sortByPrepTime} />
            </div>
            <div className="col">
              <AscendingRadioButtons
                setIsAscending={setIsAscending}
                isAscending={isAscending}
              />
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
