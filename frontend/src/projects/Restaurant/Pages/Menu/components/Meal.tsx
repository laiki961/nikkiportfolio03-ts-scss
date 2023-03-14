import { Card } from "react-bootstrap";
import MealModel from "../../../models/MealModel";

import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../../../store/counter";

const Meal: React.FC<{ meal: MealModel }> = (props) => {
  const dispatch = useDispatch();

  const counter = useSelector((state: any) => state.counter.counter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const addToCartHandler = () => {};

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
      <div className='restaurant__cta'>
        <div className='restaurant__quantity-control'>
          <button
            className='restaurant__quantity-control-button'
            onClick={decrementHandler}
          >
            -
          </button>
          <input
            id='meal-quantity'
            type='number'
            value={counter}
            disabled
            className='restaurant__cta-input'
          ></input>
          <button
            className='restaurant__quantity-control-button'
            onClick={incrementHandler}
          >
            +
          </button>
        </div>
        <button className='restaurant__cta-button' onClick={addToCartHandler}>
          Add
        </button>
      </div>
    </Card>
  );
};

export default Meal;
