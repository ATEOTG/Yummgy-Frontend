import React from "react";

function AscendingRadioButtons(props) {
  return (
    <div className="col mt-5">
      <div className="d-flex flex-column justify-content-left w-90">
        <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onClick={() => props.setIsAscending(false)}
          checked={props.isAscending ? false : true}
        />
        <label class="form-check-label fw-bold" for="flexRadioDefault1">
          Descending
        </label>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-left w-90">
        <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          onClick={() => props.setIsAscending(true)}
          checked={props.isAscending ? true : false}
        />
        <label class="form-check-label fw-bold" for="flexRadioDefault2">
          Ascending
        </label>
        </div>
      </div>
    </div>
  );
}

export default AscendingRadioButtons;
