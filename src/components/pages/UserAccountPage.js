import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../../svg/SearchIcon";
import UserFavoriteCard from "./user/UserFavoriteCard";
import UserRecipeCard from "./user/UserRecipeCard";
import YummgyApi from "../../apis/YummgyApi";

function UserAccountPage(props) {
  const [userRecipes, setUserRecipe] = useState([]);
  const searchInputRef = useRef(null);
  const [searchRecipeList, setSearchRecipeList] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    YummgyApi.getUserRecipes(props.id, setUserRecipe);
    YummgyApi.getUserFavoriteRecipes(
      props.id,
      setFavoriteRecipes,
      setSearchRecipeList
    );
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setSearchRecipeList(() => {
      return favoriteRecipes.filter((el) => {
        const recipe = el.recipe;
        return recipe.title
          .toLocaleLowerCase()
          .includes(searchInputRef.current.value.toLocaleLowerCase());
      });
    });
  };

  const viewMoreHandler = () => {
    setViewMore(!viewMore);
  };

  const deleteUserRecipeHandler = (id) => {
    setUserRecipe(() => {
      return userRecipes.filter((el) => {
        return el.recipeId !== id;
      });
    });
    YummgyApi.deleteRecipeAdmin(id);
  };

  return (
    <div className="d-flex gap-3 w-100">
      <div className="user-main-info-cont w-50 d-flex flex-column gap-2">
        <div>
          <h2 className="text-center border border-2 border-black rounded p-1 user-main-info-username">
            {props.username}
          </h2>
          <div className="border border-2 border-black rounded text-center user-main-info-user">
            <h2>User Info</h2>
            <p>Recipes Authored: {userRecipes.length}</p>
            <p>Recipes Favorited: {favoriteRecipes.length}</p>
          </div>
        </div>
        <div></div>
        <ul className="p-0 d-flex flex-column gap-1 user-page-list">
          {userRecipes.map((recipe, i) => {
            if (!viewMore) {
              if (i < 2) {
                return (
                  <UserRecipeCard
                    key={`${recipe.recipeId} + ${i}`}
                    recipeId={recipe.recipeId}
                    title={recipe.title}
                    image={recipe.foodImageUrl}
                    ingredients={recipe.ingredients}
                    prepTime={recipe.prepTime}
                    directions={recipe.directions}
                    notInRecipePage={true}
                    deleteUserRecipeHandler={deleteUserRecipeHandler}
                    canModifyRecipe={props.role === "ROLE_ADMIN"}
                    role={props.role}
                  />
                );
              } else return null;
            } else {
              return (
                <UserRecipeCard
                  key={`${recipe.recipeId} + ${i}`}
                  recipeId={recipe.recipeId}
                  title={recipe.title}
                  image={recipe.foodImageUrl}
                  prepTime={recipe.prepTime}
                  directions={recipe.directions}
                  ingredients={recipe.ingredients}
                  notInRecipePage={true}
                  deleteUserRecipeHandler={deleteUserRecipeHandler}
                  canModifyRecipe={props.role === "ROLE_ADMIN"}
                  role={props.role}
                />
              );
            }
          })}
        </ul>
        <button
          className="border border-2 border-black rounded w-100"
          onClick={viewMoreHandler}
        >
          {!viewMore ? `View More` : `View Less`}
        </button>
      </div>
      <div className="w-75">
        <form
          className="input-group search-form mb-2"
          onSubmit={onSubmitHandler}
        >
          <SearchIcon />
          <input
            className="form-control border border-2 border-black rounded-pill text-input"
            type="text"
            ref={searchInputRef}
            name="search"
            placeholder="Search In User's Favorites..."
          />
        </form>
        <ul className="p-0 d-flex flex-column gap-2 user-page-list-cont">
          {searchRecipeList.length !== 0 ? (
            searchRecipeList.map((recipe, i) => {
              const recipeObj = recipe.recipe;
              return (
                <UserFavoriteCard
                  key={`${recipeObj.id} + ${i}`}
                  id={recipeObj.recipeId}
                  title={recipeObj.title}
                  author={recipeObj.author}
                  image={recipeObj.foodImageUrl}
                  ingredients={recipeObj.ingredients}
                  isUserFavoriteCard={false}
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

export default UserAccountPage;
