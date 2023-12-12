import React, { useState } from "react";
import SearchIcon from "../svg/SearchIcon";
import "./AllRecipes.css";

// const dummy = [
//   {
//     title: "Potato Salad",
//     prepTime: "2 hours",
//     author: "Debbie",
//     image:
//       "https://www.saltandlavender.com/wp-content/uploads/2016/05/potato-salad-with-bacon-1-500x500.jpg",
//     ingredients: "paprika,sweet onion, salt and pepper, mayonnaise",
//   },
//   {
//     title: "Nuggets",
//     prepTime: "30 mins",
//     author: "Debbie",
//     image:
//       "https://lilluna.com/wp-content/uploads/2023/07/chicken-nuggets3-resize-13-480x270.jpg",
//     ingredients: "bread crums, cheese, chicken, butter, seasonings",
//   },
// ];

function AllRecipes(props) {
  const [searchValue, setSearchValue] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="d-flex">
      <div className="w-25 filler-cont"></div>
      <div className="w-100">
        <form className="input-group search-form" onSubmit={onSubmitHandler}>
          <SearchIcon />
          <input
            className="form-control border-end-0 border rounded-pill text-input"
            type="text"
            value={searchValue}
            name="search"
            placeholder="Search..."
            onChange={onChangeHandler}
          />
        </form>
      </div>
    </div>
  );
}

export default AllRecipes;
