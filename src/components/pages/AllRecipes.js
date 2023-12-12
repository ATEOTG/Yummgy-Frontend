import React, { useEffect, useState } from "react";
import SearchIcon from "../../svg/SearchIcon";
import "./AllRecipes.css";
import RecipeCard from "../RecipeCard";
import { useLocation } from "react-router-dom";

const dummy = [
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
];

function AllRecipes(props) {
  const [searchValue, setSearchValue] = useState("");
  const [recipeList, setRecipeList] = useState(dummy);
  const [notInRecipePage, setNotInRecipePage] = useState(true);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path.includes("/recipe/")) {
      setNotInRecipePage(false);
    } else {
      setNotInRecipePage(true);
    }
  }, [path]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setRecipeList(() => {
      return dummy.filter((el) =>
        el.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );
    });
  };

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

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
              placeholder="Search..."
              onChange={onChangeHandler}
            />
          </form>
        )}

        <ul className="mt-5 d-flex flex-column p-0 gap-4">
          {recipeList.length !== 0 ? (
            recipeList.map((recipe, i) => {
              return (
                <RecipeCard
                  key={`${recipe.title} + ${i}`}
                  title={recipe.title}
                  prepTime={recipe.prepTime}
                  author={recipe.author}
                  image={recipe.image}
                  ingredients={recipe.ingredients}
                  directions={recipe.directions}
                  notInRecipePage={notInRecipePage}
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
