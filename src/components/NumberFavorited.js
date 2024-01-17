import React from "react";
import FavIcon from "../svg/FavIcon";
import "./NumberFavorited.css";

function NumberFavorited(props) {
  return (
    <div className="position-absolute d-flex number-display-cont gap-1">
      <FavIcon
        favorite={true}
        setUserListModal={props.setUserListModal}
        numberDisplay={true}
      />
      <p className="fw-bold number-display-text">
        {props.numberOfUsersWhoFavorited}
      </p>
    </div>
  );
}

export default NumberFavorited;
