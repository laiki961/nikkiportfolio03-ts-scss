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
import React, { MouseEventHandler, ReactElement } from "react";
import NewMenuForm from "./MenuForm";

type PropsType = {
  key: number;
  meal: MealModel;
  dispatchCart?: React.Dispatch<CartReducerAction>;
  CART_REDUCER_ACTIONS?: CartReducerActionType;
  inCart?: boolean;
  className: string;
  onRemove?: (id: number) => void;
  onShowEditModal?: MouseEventHandler<HTMLButtonElement>;
};

const MenuItem: React.FC<PropsType> = (props) => {
  const { meal, dispatchCart, CART_REDUCER_ACTIONS, inCart, className } = props;
  const { id, name, price, description } = meal;

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
    props.onRemove !== undefined &&
    props.onShowEditModal !== undefined
  ) {
    content = (
      <div className={`${className}-card__features`} key={id}>
        <button className='edit' type='button' onClick={props.onShowEditModal}>
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
    );
  }

  return (
    <Card className={`${className}-card`}>
      {meal.img !== null ? (
        <img
          src={meal.img}
          className={`${className}-card__meal-img`}
          alt={name}
        />
      ) : (
        <img
          src={require(`../../../../../components/no-image.jpg`)}
          className={`${className}-card__meal-img`}
          alt={name}
        />
      )}

      <div className={`${className}-card__meal-name`}>{name}</div>
      <i className={`${className}-card__description hidden`}>{description}</i>
      <div className={`${className}-card__price`}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "CAD",
        }).format(price)}
      </div>
      {content}
    </Card>
  );
};

export default React.memo(MenuItem);
