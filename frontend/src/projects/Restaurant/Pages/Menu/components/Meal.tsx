import { Card } from "react-bootstrap";
import MealModel from "../../../Models/MealModel";
import MenuForm from "./MenuForm";
import {
  ReducerActionType as CartReducerActionType,
  ReducerAction as CartReducerAction,
} from "../../../Store/CartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../../../components/Loading/Loading";
import React, { MouseEventHandler, ReactElement, SetStateAction } from "react";
import { useAppDispatch } from "../../../Store/store";
import { ProductReqDto } from "../../../domain/dto/backend-dto";

type PropsType = {
  key: number;
  meal: MealModel;
  dispatchCart?: React.Dispatch<CartReducerAction>;
  CART_REDUCER_ACTIONS?: CartReducerActionType;
  inCart?: boolean;
  className: string;
  onRemove?: (id: number) => void;
  onShowEditModal?: MouseEventHandler<HTMLButtonElement>;
  // onEdit?: (id: number) => void;
};

const Meal: React.FC<PropsType> = (props) => {
  const { meal, dispatchCart, CART_REDUCER_ACTIONS, inCart, className } = props;
  const { id, name, price, description, img } = meal;
  const dispatch = useAppDispatch();

  // const img: string = new URL(`../../../images/${meal.id}.jpg`, import.meta.url).href;
  // console.log(img);

  const addToCartHandler = (amount: number) => {
    dispatchCart!({
      type: CART_REDUCER_ACTIONS!.ADD,
      payload: { ...meal, amount: amount },
    });
  };

  let content: ReactElement | ReactElement[] = <Loading />;
  if (className === "menu" && inCart !== undefined) {
    content = (
      <MenuForm
        key={id}
        onAddToCart={addToCartHandler}
        inCart={inCart}
        className='menu'
      />
    );
  }

  if (
    className === "admin" &&
    props.onRemove !== undefined
    // && props.onEdit !== undefined
  ) {
    content = (
      <div className='restaurant-admin__features' key={id}>
        <div className='restaurant-admin__features-icon'>
          <button
            className='edit'
            type='button'
            onClick={props.onShowEditModal}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            className='delete'
            type='button'
            onClick={props.onRemove.bind(null, id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <Card className='restaurant-card'>
      <div className='restaurant-card__img-box'>
        {img ? (
          <img src={img} className='meal-img' alt={name} />
        ) : (
          <img
            src={require("../../../images/pad_thai.jpeg")}
            alt={name}
            className='meal-img'
          />
        )}
        {/* <img
          src={require("../../../images/pad_thai.jpeg")}
          alt={name}
          className='meal-img'
        ></img> */}
      </div>
      <div className='restaurant-card__detail'>
        <div className='meal-name'>{name}</div>
        <i className='meal-description'>{description}</i>
        <div className='meal-price'>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "CAD",
          }).format(price)}
        </div>
      </div>
      {content}
    </Card>
  );
};

export default React.memo(Meal);
