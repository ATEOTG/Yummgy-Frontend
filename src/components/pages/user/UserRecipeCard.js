import React, { useState } from "react";
import "./UserRecipeCard.css";
import UpdateModal from "../../UpdateModal";

function UserRecipeCard(props) {
  const [userRecipeModal, setUserRecipeModal] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({
    prepTime: props.prepTime,
    directions: props.directions,
    title: props.title,
    ingredients: props.ingredients,
    foodImageUrl: props.image,
  });

  const updatedValueHandler = (updatedObj) => {
    setRecipeInfo(updatedObj);
  };

  return (
    <li className="list-unstyled p-3 d-flex gap-2 border border-2 border-black rounded recipe-card w-100">
      <img
        src={recipeInfo.foodImageUrl}
        alt={`${recipeInfo.title}`}
        id="user-recipe-img"
        className="w-50 border border-2 border-black rounded"
      />

      <div className="border border-2 border-black rounded recipe-card-text-cont position-relative d-flex justify-content-center user-recipe-text-cont">
        {props.canModifyRecipe && (
          <button
            onClick={() => {
              props.deleteUserRecipeHandler(props.recipeId);
            }}
            className="del-btn border border-2 border-black rounded"
          >
            Delete
          </button>
        )}

        {props.canModifyRecipe && (
          <button
            onClick={() => setUserRecipeModal(true)}
            className="edit-btn border border-2 border-black rounded"
          >
            Edit
          </button>
        )}

        <UpdateModal
          id={props.recipeId}
          title={recipeInfo.title}
          ingredients={recipeInfo.ingredients}
          image={recipeInfo.foodImageUrl}
          directions={recipeInfo.directions}
          prepTime={recipeInfo.prepTime}
          show={userRecipeModal}
          editRecipeHandler={props.editRecipeHandler}
          updatedValueHandler={updatedValueHandler}
          onHide={() => setUserRecipeModal(false)}
        />
        <h4 className="text-center fw-bold mt-3 overflow-hidden user-recipe-title">
          {recipeInfo.title}
        </h4>
      </div>
    </li>
  );
}

export default UserRecipeCard;
