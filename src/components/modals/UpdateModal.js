import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import YummgyApi from "../../apis/YummgyApi";

function UpdateModal(props) {
  const {
    isAdmin,
    updatedValueHandler,
    prepTime: prepTimeProp,
    ...rest
  } = props;
  const [recipeName, setRecipeName] = useState(props.title);
  const [ingredients, setIngredients] = useState(props.ingredients);
  const [directions, setDirections] = useState(props.directions);
  const [prepTime, setPrepTime] = useState(prepTimeProp);
  const [imageUrl, setImageUrl] = useState(props.image);
  const [recipeUpdatedFailure, setRecipeUpdatedFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const recipeNameHandler = (e) => {
    setRecipeName(e.target.value);
  };

  const ingredientsHandler = (e) => {
    setIngredients(e.target.value);
  };

  const directionHandler = (e) => {
    setDirections(e.target.value);
  };

  const prepTimeHandler = (e) => {
    setPrepTime(e.target.value);
  };

  const imageUrlHandler = (e) => {
    setImageUrl(e.target.value);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        recipeName === "" ||
        directions === "" ||
        recipeName === "" ||
        ingredients === "" ||
        prepTime === ""
      ) {
        throw new Error("Please complete all recipe fields.");
      }

      const formInfo = {
        prepTime: prepTime,
        directions: directions,
        recipeId: props.id,
        title: recipeName,
        ingredients: ingredients,
        foodImageUrl: imageUrl,
      };

      if (isAdmin) {
        await YummgyApi.updateRecipeAdmin(formInfo);
      } else {
        await YummgyApi.updateRecipe(formInfo);
      }

      updatedValueHandler(formInfo);
      props.onHide();
    } catch (err) {
      const errorMessage = err.message;
      setErrorMessage(errorMessage);
      setRecipeUpdatedFailure(true);
      setTimeout(() => {
        setRecipeUpdatedFailure(false);
      }, 2000);
    }
  };

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="fw-bold">Enter Recipe</h4>
        <br />
        <form onSubmit={submitFormHandler}>
          <div className="d-flex gap-4 mb-3">
            <label
              htmlFor="name"
              className="border border-2 border-black rounded login-label fs-5 text-center py-1"
            >
              Recipe Name
            </label>
            <input
              className="form-control border border-2 border-black rounded"
              type="text"
              id="name"
              name="name"
              value={recipeName}
              placeholder="Recipe Name..."
              onChange={recipeNameHandler}
              required
            />
          </div>
          <div className="d-flex gap-4 mb-3">
            <label
              htmlFor="ingredients"
              className="border border-2 border-black rounded login-label fs-5 text-center py-1"
            >
              Ingredients
            </label>
            <input
              className="form-control border border-2 border-black rounded"
              type="text"
              id="ingredients"
              name="ingredients"
              value={ingredients}
              placeholder="Butter, Milk, Sugar..."
              onChange={ingredientsHandler}
              required
            />
          </div>
          <div className="d-flex gap-4 mb-3">
            <label
              htmlFor="prep"
              className="border border-2 border-black rounded login-label fs-5 text-center py-1"
            >
              Prep Time
            </label>
            <input
              className="form-control border border-2 border-black rounded"
              type="text"
              id="prep"
              name="prep"
              value={prepTime}
              placeholder="Prep time..."
              onChange={prepTimeHandler}
              required
            />
          </div>
          <div className="d-flex gap-4 mb-3">
            <label
              htmlFor="imageUrl"
              className="border border-2 border-black rounded login-label fs-5 text-center py-1"
            >
              Image URL
            </label>
            <input
              className="form-control border border-2 border-black rounded"
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              placeholder="example.png..."
              onChange={imageUrlHandler}
              required
            />
          </div>
          <div className="d-flex gap-4 mb-3">
            <label
              htmlFor="directions"
              className="border border-2 border-black rounded login-label fs-5 text-center py-1 d-flex align-items-center justify-content-center"
            >
              Directions
            </label>
            <textarea
              className="form-control border border-2 border-black rounded"
              id="directions"
              name="directions"
              value={directions}
              placeholder="Directions..."
              onChange={directionHandler}
              required
              cols="30"
              rows="4"
            ></textarea>
          </div>{" "}
          <Modal.Footer>
            {recipeUpdatedFailure && (
              <div className="w-100 d-flex justify-content-center mt-4">
                <div
                  className="alert alert-danger w-50 text-center"
                  role="alert"
                >
                  {errorMessage}
                </div>
              </div>
            )}
            <Button
              className="border border-2 border-black modal-btn-cls fw-bold"
              onClick={() => {
                setRecipeName(props.title);
                setIngredients(props.ingredients);
                setDirections(props.directions);
                setPrepTime(prepTimeProp);
                setImageUrl(props.image);
                props.onHide();
              }}
            >
              Close
            </Button>
            <Button
              onClick={submitFormHandler}
              className="border border-2 border-black modal-btn-add fw-bold"
            >
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateModal;
