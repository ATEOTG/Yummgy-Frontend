import React from "react";
import "./DropdownMenu.css";

function DropdownMenu(props) {
  return (
    <div className="d-flex justify-content-center mt-5 w-90 m-auto">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle border border-2 border-black sort-dropdown fw-bold"
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Dropdown
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button
            type="button"
            onClick={props.sortByPrepTime}
            className="border border-2 border-black rounded p-3 px-5 fs-5 register-btn dropdown-item"
          >
            Sort Recipes by Prep Time
          </button>
          <button className="dropdown-item" type="button">
            Another action
          </button>
          <button className="dropdown-item" type="button">
            Something else here
          </button>
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
