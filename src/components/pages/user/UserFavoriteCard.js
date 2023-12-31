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
        <h2 className="text-center fw-bold">{props.title}</h2>
        <div className="mt-4 user-favorite-text-cont">
          <div>
            <p className="text-center">
              Ingredients:{" "}
              {props.ingredients.length < 160
                ? props.ingredients
                : props.ingredients.substring(0, 160) + "..."}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default UserFavoriteCard;
