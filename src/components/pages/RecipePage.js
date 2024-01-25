import React, { Fragment } from "react";
import "./RecipePage.css";

function RecipePage(props) {
  return (
    <Fragment>
      <div className="recipe-page-cont-desktop">
        <div className="d-flex justify-content-between border border-2 border-black rounded recipe-header p-2">
          <h3>{props.title}</h3>
          <h3 style={{ marginRight: "3rem" }}>
            Prep Time: {props.prepTime} Minutes
          </h3>
        </div>
        <div className="d-flex mt-3 gap-5 recipe-main-page-cont">
          <div className="w-50 d-flex flex-column gap-4">
            <img
              className="border border-2 border-black rounded w-100 h-50"
              src={props.image}
              alt={`${props.title}`}
            />
            <div className="border border-2 border-black rounded ingredients-cont h-50 p-2">
              <p className="fw-bold">Ingredients </p>
              <br />
              <p>{props.ingredients}</p>
            </div>
          </div>
          <div className="border border-2 border-black rounded w-50 directions-cont p-2 overflow-y-scroll">
            <p className="fw-bold">Directions </p>
            <br />
            <p>{props.directions}</p>
          </div>
        </div>
      </div>
      <div className="recipe-page-cont-mobile">
        <div className="d-flex flex-column gap-4">
          <div className="d-flex justify-content-center border border-2 border-black rounded recipe-header p-2">
            <h3 className="fw-bold text-center">{props.title}</h3>
          </div>
          <div className="d-flex justify-content-center border border-2 border-black rounded recipe-header p-2">
            <h3 className="fw-bold">Prep Time: {props.prepTime} Minutes</h3>
          </div>
        </div>

        <div className="d-flex flex-column mt-3 gap-5 recipe-main-page-cont">
          <div className="w-100 d-flex flex-column gap-4">
            <img
              className="border border-2 border-black rounded w-100 h-50"
              src={props.image}
              alt={`${props.title}`}
            />
            <div className="accordion" id="accordionExample">
              <div className="accordion-item border border-2 border-black rounded directions-cont">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Ingredients
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">{props.ingredients}</div>
                </div>
              </div>
              <div className="accordion-item border border-2 border-black rounded directions-cont">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button fw-bold collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Directions
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">{props.directions}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RecipePage;
