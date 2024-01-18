import React, { useEffect, useState } from "react";
import "./UserRecipeCard.css";
import UpdateModal from "../../modals/UpdateModal";
import NumberFavorited from "../../NumberFavorited";
import YummgyApi from "../../../apis/YummgyApi";

function UserRecipeCard(props) {
  const [userRecipeModal, setUserRecipeModal] = useState(false);
  const [userFavoritedList, setUserFavoritedList] = useState([]);
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

  useEffect(() => {
    YummgyApi.getRecipeFavoritedList(setUserFavoritedList, props.recipeId);
  }, []);

  return (
    <li className="list-unstyled p-3 d-flex gap-2 border border-2 border-black rounded recipe-card w-100">
      <img
        src={recipeInfo.foodImageUrl}
        alt={`${recipeInfo.title}`}
        id="user-recipe-img"
        className="w-50 border border-2 border-black rounded"
      />

      <div className="border border-2 border-black rounded recipe-card-text-cont position-relative d-flex justify-content-center user-recipe-text-cont">
        <NumberFavorited
          title={props.title}
          numberOfUsersWhoFavorited={userFavoritedList.length}
          userlist={userFavoritedList}
          userId={props.userId}
        />
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
          updatedValueHandler={updatedValueHandler}
          onHide={() => setUserRecipeModal(false)}
          isAdmin={props.role === "ROLE_ADMIN"}
        />
        <h4 className="text-center fw-bold mt-3 overflow-hidden user-recipe-title">
          {recipeInfo.title}
        </h4>
      </div>
    </li>
  );
}

export default UserRecipeCard;
