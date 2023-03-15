import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import MealModel from "../../../models/MealModel";
import store from "../../../store";
import MealForm from "./MealForm";
import { RootState } from "../../../store/index";
// import { Order } from "../../../models/CartModel";
import { cartActions } from "../../../store/cart-slice";

const Meal: React.FC<{ meal: MealModel }> = (props) => {
  const dispatch = useDispatch();
  const { id, name, price } = props.meal;

  // const meals = useSelector<RootState, Order[]>((state) => state.items);

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({ id, name, price }));
  };

  return (
    <Card className='restaurant__meal-card u-margin-tb-sm'>
      <div className='restaurant__meal-img-box'>
        <img
          src={require("../../../images/pad_thai.jpeg")}
          alt='proudct'
          className='meal-img'
        ></img>
      </div>
      <div className='restaurant__meal-detail'>
        <div className='meal-name'>{props.meal.name}</div>
        <i className='meal-description'>{props.meal.description}</i>
        <div className='meal-price'>CAD ${props.meal.price}</div>
      </div>
      <MealForm key={props.meal.id} onAddToCart={addToCartHandler} />
    </Card>
  );
};

export default Meal;
