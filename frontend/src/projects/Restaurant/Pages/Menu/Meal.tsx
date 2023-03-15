import { Card } from "react-bootstrap";
import MealModel from "../../Models/MealModel";
import MealForm from "./MealForm";
import { ReducerActionType, ReducerAction } from "../../Store/CartProvider";

type PropsType = {
  key: number;
  meal: MealModel;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Meal: React.FC<PropsType> = (props) => {
  const { meal, dispatch, REDUCER_ACTIONS, inCart } = props;
  const { id, name, price, description } = meal;

  // const img: string = new URL(`../../../images/${meal.id}.jpg`, import.meta.url).href;
  // console.log(img);

  const addToCartHandler = () => {
    // dispatch(cartActions.addItemToCart({ id, name, price }));
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...meal, amount: 1, subTotal: price },
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
      <MealForm key={id} onAddToCart={addToCartHandler} inCart={inCart} />
    </Card>
  );
};

export default Meal;
