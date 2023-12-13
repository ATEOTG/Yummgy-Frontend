import React, { useEffect, useState } from "react";
import SearchIcon from "../../../svg/SearchIcon";
import "./UserPage.css";
import UserRecipeCard from "./UserRecipeCard";
import UserFavoriteCard from "./UserFavoriteCard";
import RecipeModal from "../../RecipeModal";
import YummgyApi from "../../../apis/YummgyApi";
import { useNavigate } from "react-router-dom";

const dummyUser = {
  username: "user1",
  recipesAuthored: 1,
};

function UserPage(props) {
  const [user, setUser] = useState(dummyUser);
  const [userInfo, setUserInfo] = useState("");
  const [userRecipes, setUserRecipe] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchRecipeList, setSearchRecipeList] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [recipeModalShow, setRecipeModalShow] = useState(false);
  const [deletedRecipe, setDeletedRecipe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    YummgyApi.getUserRecipes(setUserRecipe);
    YummgyApi.getLoggedInUser(setUserInfo);
    YummgyApi.getUserFavoriteRecipes(setFavoriteRecipes, setSearchRecipeList);
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setSearchRecipeList(() => {
      return favoriteRecipes.filter((el) => {
        const recipe = el.recipe;
        return recipe.title
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      });
    });
  };

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const viewMoreHandler = () => {
    setViewMore(!viewMore);
  };

  const deleteFavoriteHandler = (id) => {
    console.log("clicked");
  };

  const deleteUserRecipeHandler = (id) => {
    YummgyApi.deleteRecipe(id, setUserRecipe);
  };

  return (
    <div className="d-flex gap-3">
      <div className="user-main-info-cont w-50 d-flex flex-column gap-2">
        <div>
          <h2 className="text-center border border-2 border-black rounded p-1 user-main-info-username">
            {userInfo.yumUsername}
          </h2>
          <div className="border border-2 border-black rounded text-center user-main-info-user">
            <h2>User Info</h2>
            <p>Recipes Authored: {userRecipes.length}</p>
            <p>Recipes Favorited: {favoriteRecipes.length}</p>
          </div>
        </div>
        <div>
          <button
            onClick={() => setRecipeModalShow(true)}
            className="border border-2 border-black rounded w-100"
          >
            Add Recipe
          </button>

          <RecipeModal
            show={recipeModalShow}
            onHide={() => setRecipeModalShow(false)}
          />
        </div>
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
            value={searchValue}
            name="search"
            placeholder="Search..."
            onChange={onChangeHandler}
          />
        </form>
        <ul className="p-0 d-flex flex-column gap-2 user-page-list-cont">
          {searchRecipeList.length !== 0 ? (
            searchRecipeList.map((recipe, i) => {
              const recipeObj = recipe.recipe;
              return (
                <UserFavoriteCard
                  key={`${recipeObj.id} + ${i}`}
                  id={recipeObj.id}
                  title={recipeObj.title}
                  author={recipeObj.author}
                  image={recipeObj.foodImageUrl}
                  ingredients={recipeObj.ingredients}
                  deleteFavoriteHandler={deleteFavoriteHandler}
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

export default UserPage;
