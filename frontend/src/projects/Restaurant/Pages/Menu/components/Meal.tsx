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
import { ReactElement } from "react";
import {
  ReducerActionType as AdminReducerActionType,
  ReducerAction as AdminReducerAction,
} from "../../../Store/AdminProvider";

type PropsType = {
  key: number;
  meal: MealModel;
  dispatchCart?: React.Dispatch<CartReducerAction>;
  CART_REDUCER_ACTIONS?: CartReducerActionType;
  inCart?: boolean;
  className: string;
  // onClickRemove?: () => void;
  dispatchAdmin?: React.Dispatch<AdminReducerAction>;
  ADMIN_REDUCER_ACTIONS?: AdminReducerActionType;
};

const Meal: React.FC<PropsType> = (props) => {
  const {
    meal,
    dispatchCart,
    CART_REDUCER_ACTIONS,
    inCart,
    className,
    dispatchAdmin,
    ADMIN_REDUCER_ACTIONS,
  } = props;
  const { id, name, price, description } = meal;

  // const img: string = new URL(`../../../images/${meal.id}.jpg`, import.meta.url).href;
  // console.log(img);

  const addToCartHandler = (amount: number) => {
    dispatchCart!({
      type: CART_REDUCER_ACTIONS!.ADD,
      payload: { ...meal, amount: amount },
    });
  };

  const removeMealFromMenuHandler = (id: number) => {
    console.log(`Clicked Removed: ${id}`);
    dispatchAdmin!({
      type: ADMIN_REDUCER_ACTIONS!.REMOVE,
      payload: { ...meal, id: id },
    });
  };

  const editMealFromMenuHandler = (id: number) => {
    console.log(`Clicked Edit: ${id}`);
    //actions

    dispatchAdmin!({
      type: ADMIN_REDUCER_ACTIONS!.UPDATE,
      payload: { ...meal },
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
  if (className === "admin") {
    content = (
      <div className='restaurant-admin__features' key={id}>
        <div className='restaurant-admin__features-icon'>
          <button
            className='edit'
            type='button'
            onClick={editMealFromMenuHandler.bind(null, id)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            className='delete'
            type='button'
            onClick={removeMealFromMenuHandler.bind(null, id)}
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
        <img
          src={require("../../../images/pad_thai.jpeg")}
          alt={name}
          className='meal-img'
        ></img>
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

export default Meal;
