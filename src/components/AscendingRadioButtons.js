import React from "react";

function AscendingRadioButtons(props) {
  return (
    <div className="d-flex gap-3">
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
          DESC
        </label>
      </div>
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
          ASC
        </label>
      </div>
    </div>
  );
}

export default AscendingRadioButtons;
