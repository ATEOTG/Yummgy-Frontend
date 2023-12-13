import React, { useState } from "react";
import SearchIcon from "../../../svg/SearchIcon";
import "./UserPage.css";
import UserRecipeCard from "./UserRecipeCard";
import UserFavoriteCard from "./UserFavoriteCard";
import RecipeModal from "../../RecipeModal";

const dummyUser = {
  username: "user1",
  recipesAuthored: 1,
  recipesFavorited: 5,
  userRecipe: [
    {
      title: "Potato Salad",
      prepTime: "2 hours",
      author: "Debbie",
      image:
        "https://www.saltandlavender.com/wp-content/uploads/2016/05/potato-salad-with-bacon-1-500x500.jpg",
      ingredients: "paprika,sweet onion, salt and pepper, mayonnaise",
      directions: "yappington",
    },
    {
      title: "Grilled Chicken",
      prepTime: "1.5 hours",
      author: "John",
      image:
        "https://www.jocooks.com/wp-content/uploads/2022/07/grilled-chicken-breast-1-21-500x500.jpg",
      ingredients: "chicken breasts, olive oil, garlic, lemon, thyme",
      directions:
        "Preheat the grill. Mix olive oil, minced garlic, lemon juice, and thyme. Marinate chicken and grill until cooked through.",
    },
    {
      title: "Nuggets",
      prepTime: "30 mins",
      author: "Debbie",
      image:
        "https://lilluna.com/wp-content/uploads/2023/07/chicken-nuggets3-resize-13-480x270.jpg",
      ingredients: "bread crums, cheese, chicken, butter, seasonings",
      directions: "yappity yap yap",
    },
  ],
  favoritedRecipes: [
    {
      title: "Grilled Chicken",
      prepTime: "1.5 hours",
      author: "John",
      image:
        "https://www.jocooks.com/wp-content/uploads/2022/07/grilled-chicken-breast-1-21-500x500.jpg",
      ingredients: "chicken breasts, olive oil, garlic, lemon, thyme",
      directions:
        "Preheat the grill. Mix olive oil, minced garlic, lemon juice, and thyme. Marinate chicken and grill until cooked through.",
    },
    {
      title: "Nuggets",
      prepTime: "30 mins",
      author: "Debbie",
      image:
        "https://lilluna.com/wp-content/uploads/2023/07/chicken-nuggets3-resize-13-480x270.jpg",
      ingredients: "bread crums, cheese, chicken, butter, seasonings",
      directions: "yappity yap yap",
    },
  ],
};

function UserPage(props) {
  const [user, setUser] = useState(dummyUser);
  const [searchValue, setSearchValue] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState(user.favoritedRecipes);
  const [viewMore, setViewMore] = useState(false);
  const [recipeModalShow, setRecipeModalShow] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setFavoriteRecipes(() => {
      return user.favoritedRecipes.filter((el) =>
        el.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );
    });
  };

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const viewMoreHandler = () => {
    setViewMore(!viewMore);
  };

  const deleteFavoriteHandler = () => {
    // code here
  };

  return (
    <div className="d-flex gap-3">
      <div className="user-main-info-cont w-50 d-flex flex-column gap-2">
        <div>
          <h2 className="text-center border border-2 border-black rounded p-1 user-main-info-username">
            {user.username}
          </h2>
          <div className="border border-2 border-black rounded text-center user-main-info-user">
            <h2>User Info</h2>
            <p>Recipes Authored: {user.recipesAuthored}</p>
            <p>Recipes Favorited: {user.recipesFavorited}</p>
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
          {user.userRecipe.map((recipe, i) => {
            if (!viewMore) {
              if (i < 2) {
                return (
                  <UserRecipeCard
                    key={`${recipe.title} + ${i}`}
                    title={recipe.title}
                    image={recipe.image}
                    ingredients={recipe.ingredients}
                    prepTime={recipe.prepTime}
                    directions={recipe.directions}
                    notInRecipePage={true}
                  />
                );
              } else return null;
            } else {
              return (
                <UserRecipeCard
                  key={`${recipe.title} + ${i}`}
                  title={recipe.title}
                  image={recipe.image}
                  prepTime={recipe.prepTime}
                  directions={recipe.directions}
                  ingredients={recipe.ingredients}
                  notInRecipePage={true}
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
          {favoriteRecipes.length !== 0 ? (
            favoriteRecipes.map((recipe, i) => {
              return (
                <UserFavoriteCard
                  key={`${recipe.title} + ${i}`}
                  title={recipe.title}
                  author={recipe.author}
                  image={recipe.image}
                  ingredients={recipe.ingredients}
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
