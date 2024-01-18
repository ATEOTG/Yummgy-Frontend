import React from "react";
import "./DropdownMenu.css";

function DropdownMenu(props) {
  return (
    <div className="mt-5">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle border border-2 border-black sort-dropdown fw-bold"
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort Recipes By
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button
            type="button"
            onClick={props.sortByPrepTime}
            className="dropdown-item"
          >
            Prep Time
          </button>
          <button
            className="dropdown-item"
            type="button"
            onClick={props.sortByFavorites}
          >
            Favorites
          </button>
          <button
            className="dropdown-item"
            type="button"
            onClick={props.sortByTitle}
          >
            Title
          </button>
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
