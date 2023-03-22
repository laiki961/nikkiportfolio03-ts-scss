import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ProductReqDto } from "../../domain/dto/backend-dto";
import useInput from "../../../../hooks/use-input";

const ModalComponent: React.FC<{
  addMeal: (productReqDto: ProductReqDto) => void;
  setShowModal: () => void;
  showModal: boolean;
}> = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredCategory,
    isValid: enteredCategoryIsValid,
    hasError: categoryInputHasError,
    valueChangeHandler: categoryChangedHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategoryInput,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangedHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
  } = useInput((value: string) => value.trim() !== "");

  const DUMMY_PRODUCTDTO: ProductReqDto = {
    name: "testing",
    description: "testing",
    category: "Noodles",
    price: 20.0,
  };

  const nameInputClasses = nameInputHasError
    ? "restaurant-admin__form-control invalid"
    : "restaurant-admin__form-control";

  const descriptionInputClasses = descriptionInputHasError
    ? "restaurant-admin__form-control invalid"
    : "restaurant-admin__form-control";

  const categoryInputClasses = categoryInputHasError
    ? "restaurant-admin__form-control invalid"
    : "restaurant-admin__form-control";

  const priceInputClasses = priceInputHasError
    ? "restaurant-admin__form-control invalid"
    : "restaurant-admin__form-control";

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredDescriptionIsValid &&
    enteredCategoryIsValid &&
    enteredPriceIsValid
  ) {
    formIsValid = true;
  }

  const resetAllInputs = () => {
    resetNameInput();
    resetDescriptionInput();
    resetCategoryInput();
    resetPriceInput();
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Clicked Submit`);
    if (!formIsValid) {
      console.log(`form is invalid`);
      return;
    }
    const productReqDto: ProductReqDto = {
      name: enteredName,
      description: enteredDescription,
      category: enteredCategory,
      price: +enteredPrice,
    };
    props.addMeal(productReqDto);
    resetAllInputs();
    props.setShowModal();
  };

  return (
    <div className='restaurant-admin__modal'>
      <Modal show={props.showModal} onHide={props.setShowModal}>
        <Modal.Header closeButton>
          <div className='restaurant-admin__modal-title'>Update / Add Meal</div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group
              className={`mb-3 restaurant-admin__input-group  ${nameInputClasses}`}
              controlId='mealName'
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
              />
              {nameInputHasError && (
                <Form.Text className='error-text'>
                  Name must not be empty.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className={`mb-3 restaurant-admin__input-group ${descriptionInputClasses}`}
              controlId='mealDescription'
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                type='description'
                placeholder='Description'
                onChange={descriptionChangedHandler}
                onBlur={descriptionBlurHandler}
                value={enteredDescription}
              />
              {descriptionInputHasError && (
                <Form.Text className='error-text'>
                  Description must not be empty.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className={`mb-3 restaurant-admin__input-group ${categoryInputClasses}`}
              controlId='mealCategory'
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='category'
                placeholder='Category'
                onChange={categoryChangedHandler}
                onBlur={categoryBlurHandler}
                value={enteredCategory}
              />
              {categoryInputHasError && (
                <Form.Text className='error-text'>
                  Category must not be empty.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className={`mb-3 restaurant-admin__input-group ${priceInputClasses}`}
              controlId='mealPrice'
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='price'
                placeholder='Price'
                onChange={priceChangedHandler}
                onBlur={priceBlurHandler}
                value={enteredPrice}
              />
              {priceInputHasError && (
                <Form.Text className='error-text'>
                  Price must not be empty & greater than 0.
                </Form.Text>
              )}
            </Form.Group>
            <Modal.Footer>
              <button
                className='restaurant-btn seconday'
                onClick={props.setShowModal}
              >
                Close
              </button>
              <button className='restaurant-btn' type='submit'>
                Submit
              </button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalComponent;
