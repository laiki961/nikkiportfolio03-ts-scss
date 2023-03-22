import React, { MouseEventHandler, useState } from "react";
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
  } = useInput((value: string) => value.trim() !== "" && +value.trim() !== 0);

  const DUMMY_PRODUCTDTO: ProductReqDto = {
    name: "testing",
    description: "testing",
    category: "Noodles",
    price: 20.0,
  };

  const submitHandler = (e: React.FormEvent) => {
    console.log(`Clicked Submit`);
    e.preventDefault();
    props.addMeal.bind(null, DUMMY_PRODUCTDTO);
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
              className='mb-3 restaurant-admin__input-group'
              controlId='mealName'
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                className='restaurant-admin__form-control'
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
              />
              {nameInputHasError && (
                <Form.Text className='text-muted'>
                  Name must not be empty.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className='mb-3 restaurant-admin__input-group'
              controlId='mealDescription'
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='description'
                placeholder='Description'
                className='restaurant-admin__form-control'
                onChange={descriptionChangedHandler}
                onBlur={descriptionBlurHandler}
                value={enteredDescription}
              />
              {descriptionInputHasError && (
                <Form.Text className='text-muted'>
                  Description must not be empty.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className='mb-3 restaurant-admin__input-group'
              controlId='mealCategory'
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='category'
                placeholder='Category'
                className='restaurant-admin__form-control'
                onChange={categoryChangedHandler}
                onBlur={categoryBlurHandler}
                value={enteredCategory}
              />
              {categoryInputHasError && (
                <Form.Text className='text-muted'>
                  Category must not be empty.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className='mb-3 restaurant-admin__input-group'
              controlId='mealPrice'
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='price'
                placeholder='Price'
                className='restaurant-admin__form-control'
                onChange={priceChangedHandler}
                onBlur={priceBlurHandler}
                value={enteredPrice}
              />
              {priceInputHasError && (
                <Form.Text className='text-muted'>
                  Price must not be empty & greater than 0.
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='restaurant-btn seconday'>Close</button>
          <button className='restaurant-btn' type='submit'>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalComponent;
