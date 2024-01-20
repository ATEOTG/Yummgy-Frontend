import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./RecipeModal.css";
import YummgyApi from "../../apis/YummgyApi";

function RecipeModal(props) {
  const recipeNameRef = useRef(null);
  const ingredientsRef = useRef(null);
  const directionsRef = useRef(null);
  const prepTimeRef = useRef(null);
  const imageUrlRef = useRef(null);
  const [userInfo, setUserInfo] = useState("");
  const [recipeAddedFailure, setRecipeAddedFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    YummgyApi.getLoggedInUser(setUserInfo);
  }, []);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        recipeNameRef.current.value === "" ||
        ingredientsRef.current.value === "" ||
        directionsRef.current.value === "" ||
        prepTimeRef.current.value === "" ||
        imageUrlRef.current.value === ""
      ) {
        throw new Error("Please complete all recipe fields.");
      }

      const newRecipe = await YummgyApi.addRecipe({
        title: recipeNameRef.current.value,
        prepTime: prepTimeRef.current.value,
        ingredients: ingredientsRef.current.value,
        directions: directionsRef.current.value,
        foodImageUrl: imageUrlRef.current.value,
        author: userInfo,
      });

      props.addRecipeHandler(newRecipe);
      props.onHide();
    } catch (err) {
      const errorMessage = err.message;
      setErrorMessage(errorMessage);
      setRecipeAddedFailure(true);
      setTimeout(() => {
        setRecipeAddedFailure(false);
      }, 2000);
    }
  };

  return (
    <Modal
      {...props}
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
              ref={recipeNameRef}
              placeholder="Recipe Name..."
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
              ref={ingredientsRef}
              placeholder="Butter, Milk, Sugar..."
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
              ref={prepTimeRef}
              placeholder="Prep time..."
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
              ref={imageUrlRef}
              placeholder="example.png..."
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
              ref={directionsRef}
              placeholder="Directions..."
              required
              cols="30"
              rows="4"
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {recipeAddedFailure && (
          <div className="w-100 d-flex justify-content-center mt-4">
            <div className="alert alert-danger w-50 text-center" role="alert">
              {errorMessage}
            </div>
          </div>
        )}
        <Button
          className="border border-2 border-black modal-btn-cls fw-bold"
          onClick={props.onHide}
        >
          Close
        </Button>
        <Button
          onClick={submitFormHandler}
          className="border border-2 border-black modal-btn-add fw-bold"
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;
