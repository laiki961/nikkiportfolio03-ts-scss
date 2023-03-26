import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ProductReqDto } from "../../domain/dto/backend-dto";
import useInput from "../../../../hooks/use-input";

const ModalComponent: React.FC<{
  className: string;
  updateId?: number;
  // mealDetails?: MealItemModel | null;
  addMeal: (productReqDto: ProductReqDto) => void;
  editMeal: (id: number, productReqDto: ProductReqDto) => void;
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

  const [selectedImage, setSelectedImage] = useState<any>(null);

  //Allow user to upload an image and convert the image into a base64 so that it can be send over to the spring boot application
  async function base64ConversionForImages(e: any) {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  }

  function getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      setSelectedImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error", error);
    };
  }

  const nameInputClasses = nameInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const descriptionInputClasses = descriptionInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const categoryInputClasses = categoryInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const priceInputClasses = priceInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredDescriptionIsValid &&
    // enteredCategoryIsValid &&
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
      img: selectedImage,
    };
    console.log(productReqDto);

    if (props.className === "add-meal") {
      props.addMeal(productReqDto);
    }
    if (props.className === "update-meal" && props.updateId !== undefined) {
      console.log(props.updateId);
      props.editMeal(props.updateId, productReqDto);
    }
    resetAllInputs();
    props.setShowModal();
  };

  let title: string = "";
  if (props.className === "update-meal") {
    title = "Update Meal";
  }
  if (props.className === "add-meal") {
    title = "Add Meal";
  }

  return (
    <div className='restaurant-admin__modal'>
      <Modal show={props.showModal} onHide={props.setShowModal}>
        <Modal.Header closeButton>
          <div className='restaurant-admin__modal-title'>{title}</div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitHandler} className={`${props.className}`}>
            <div className={`form-group ${nameInputClasses}`}>
              <label htmlFor='Name'>Name</label>
              <input
                id='existingName'
                type='text'
                placeholder='Name'
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
              ></input>
              {nameInputHasError && (
                <Form.Text className='error-text'>
                  Name must not be empty.
                </Form.Text>
              )}
            </div>

            <div className={`form-group ${descriptionInputClasses}`}>
              <label htmlFor='Description'>Description</label>
              <textarea
                rows={3}
                placeholder='Description'
                onChange={descriptionChangedHandler}
                onBlur={descriptionBlurHandler}
                value={enteredDescription}
              ></textarea>
              {descriptionInputHasError && (
                <Form.Text className='error-text'>
                  Description must not be empty.
                </Form.Text>
              )}
            </div>

            {/* <div className={`form-group ${nameInputClasses}`}>
              <label htmlFor='Category'>Category</label>
              <input
                type='text'
                placeholder='Category'
                onChange={categoryChangedHandler}
                onBlur={categoryBlurHandler}
                value={enteredCategory}
              ></input>
              {categoryInputHasError && (
                <Form.Text className='error-text'>
                  Category must not be empty.
                </Form.Text>
              )}
            </div> */}

            <div className={`form-group ${priceInputClasses}`}>
              <label htmlFor='Price'>Price</label>
              <input
                type='number'
                placeholder='Price'
                onChange={priceChangedHandler}
                onBlur={priceBlurHandler}
                value={enteredPrice}
              ></input>
              {priceInputHasError && (
                <Form.Text className='error-text'>
                  Price must not be empty & greater than 0.
                </Form.Text>
              )}
            </div>
            <div className={`form-group`}>
              <input
                type='file'
                onChange={(e) => base64ConversionForImages(e)}
              />
            </div>
            <Modal.Footer>
              <button
                className='restaurant-btn seconday'
                type='button'
                onClick={props.setShowModal}
              >
                Close
              </button>
              <button
                className='restaurant-btn'
                type='submit'
                disabled={!formIsValid}
              >
                Submit
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalComponent;
