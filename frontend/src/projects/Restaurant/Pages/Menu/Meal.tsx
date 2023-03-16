import { Card } from "react-bootstrap";
import MealModel from "../../Models/MealModel";
import MealForm from "./MealForm";
import { ReducerActionType, ReducerAction } from "../../Store/CartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";

type PropsType = {
  key: number;
  meal: MealModel;
  dispatch?: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS?: ReducerActionType;
  inCart?: boolean;
  className: string;
};

const Meal: React.FC<PropsType> = (props) => {
  const { meal, dispatch, REDUCER_ACTIONS, inCart } = props;
  const { id, name, price, description } = meal;

  // const img: string = new URL(`../../../images/${meal.id}.jpg`, import.meta.url).href;
  // console.log(img);

  const addToCartHandler = (amount: number) => {
    dispatch!({
      type: REDUCER_ACTIONS!.ADD,
      payload: { ...meal, amount: amount },
    });
  };

  return (
    <Card className='restaurant-card'>
      <div className='restaurant-card__img-box'>
        <img
          src={require("../../images/pad_thai.jpeg")}
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
        {/* <div className='meal-price'>CAD ${price}</div> */}
      </div>
      {props.className === "menu" && (
        <MealForm key={id} onAddToCart={addToCartHandler} inCart={!inCart} />
      )}
      {props.className === "admin" && (
        <div className='restaurant-admin__features'>
          <div className='restaurant-admin__features-icon '>
            <FontAwesomeIcon icon={faPenToSquare} className='edit' />
            <FontAwesomeIcon icon={faTrashCan} className='delete' />
          </div>
        </div>
      )}
    </Card>
  );
};

export default Meal;
