import React from "react";
import FavIcon from "../../../svg/FavIcon";
import "./UserFavoriteCard.css";

function UserFavoriteCard(props) {
  return (
    <li className="list-unstyled p-3 d-flex gap-4 border border-2 border-black rounded recipe-card align-content-center">
      <img
        src={props.image}
        alt={`${props.title}`}
        className="w-50 border border-2 border-black rounded user-fav-img"
      />

      <div className="border border-2 border-black rounded recipe-card-text-cont  position-relative">
        <FavIcon
          className={"fav-card-icon"}
          deleteFavoriteHandler={props.deleteFavoriteHandler}
          favorite={true}
          id={props.id}
          isUserFavoriteCard={props.isUserFavoriteCard}
        />
        <h2 className="text-center fw-bold">
          {" "}
          {props.title.length < 18
            ? props.title
            : props.title.substring(0, 18) + "..."}
        </h2>
        <div className="mt-4 user-favorite-text-cont text-center">
          <div>
            <p className="text-center-desktop">
              Ingredients:{" "}
              {props.ingredients.length < 150
                ? props.ingredients
                : props.ingredients.substring(0, 150) + "..."}
            </p>
            <p className="text-center-tablet">
              Ingredients:{" "}
              {props.ingredients.length < 75
                ? props.ingredients
                : props.ingredients.substring(0, 75) + "..."}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default UserFavoriteCard;
