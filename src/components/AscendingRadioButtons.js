import React from "react";

function AscendingRadioButtons(props) {
  return (
    <div className=" d-flex flex-column gap-2 mt-5">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onChange={() => props.setIsAscending(false)}
          checked={props.isAscending ? false : true}
        />
        <label className="form-check-label fw-bold" htmlFor="flexRadioDefault1">
          Descending
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          onChange={() => props.setIsAscending(true)}
          checked={props.isAscending ? true : false}
        />
        <label className="form-check-label fw-bold" htmlFor="flexRadioDefault2">
          Ascending
        </label>
      </div>
    </div>
  );
}

export default AscendingRadioButtons;
