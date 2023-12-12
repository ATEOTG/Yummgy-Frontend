import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UpdateModal(props) {
  const [recipeName, setRecipeName] = useState(props.title);
  const [ingredients, setIngredients] = useState(props.ingredients);
  const [directions, setDirections] = useState(props.directions);
  const [prepTime, setPrepTime] = useState(props.prepTime);
  const [imageUrl, setImageUrl] = useState(props.image);

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

  const submitFormHandler = (e) => {
    e.preventDefault();

    props.onHide();
  };

  console.log(props.title);
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
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
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
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
