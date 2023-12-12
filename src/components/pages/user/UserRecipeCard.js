import React, { useState } from "react";
import "./UserRecipeCard.css";
import UpdateModal from "../../UpdateModal";

function UserRecipeCard(props) {
  const [userRecipeModal, setUserRecipeModal] = useState(false);

  const deleteButtonHandler = (e) => {
    // code here
  };

  const editButtonHandler = (e) => {
    // code here
  };

  return (
    <li className="list-unstyled p-3 d-flex gap-2 border border-2 border-black rounded recipe-card w-100">
      <img
        src={props.image}
        alt={`${props.title}`}
        className="w-50 h-50 border border-2 border-black rounded"
      />

      <div className="border border-2 border-black rounded recipe-card-text-cont position-relative d-flex justify-content-center">
        <button
          onClick={deleteButtonHandler}
          className="del-btn border border-2 border-black rounded"
        >
          Delete
        </button>
        <button
          onClick={() => setUserRecipeModal(true)}
          className="edit-btn border border-2 border-black rounded"
        >
          Edit
        </button>
        <UpdateModal
          title={props.title}
          ingredients={props.ingredients}
          image={props.image}
          directions={props.directions}
          prepTime={props.prepTime}
          show={userRecipeModal}
          onHide={() => setUserRecipeModal(false)}
        />
        <h4 className="text-center fw-bold mt-3 overflow-hidden user-recipe-title">
          {props.title}
        </h4>
      </div>
    </li>
  );
}

export default UserRecipeCard;
