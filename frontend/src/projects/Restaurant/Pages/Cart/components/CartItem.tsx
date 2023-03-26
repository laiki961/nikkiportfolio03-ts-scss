import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import QuantityControl from "../../../components/QuantityControl/QuantityControl";
import { CartItemModel } from "../../../Models/CartModel";
import { ReducerAction, ReducerActionType } from "../../../Store/CartProvider";

type PropsType = {
  item: CartItemModel;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartItem: React.FC<PropsType> = ({ item, dispatch, REDUCER_ACTIONS }) => {
  const [amount, setAmount] = useState<number>(item.amount);
  const [subTotal, setSubTotal] = useState<number>(item.amount * item.price);

  useEffect(() => {
    inputValue(amount);
    setSubTotal(amount * item.price);
  }, [amount, item]);

  const inputValue = (value: number) => {
    setAmount(value);
  };

  const onRemoveFromCart = () => {
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });
  };

  const decrementHandler = () => {
    if (amount > 1) {
      console.log(`decrementHandler: ${amount}`);
      setAmount(amount - 1);
      dispatch!({
        type: REDUCER_ACTIONS!.DECREMENT,
        payload: { ...item, amount: amount },
      });
    }
    if (amount === 1) {
      onRemoveFromCart();
    }
  };

  const incrementHandler = () => {
    if (amount < 5) {
      setAmount(amount + 1);
      console.log(`incrementHandler: ${amount}`);
      dispatch!({
        type: REDUCER_ACTIONS!.INCREMENT,
        payload: { ...item, amount: amount },
      });
    }
  };

  // const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAmount(+e.target.value);
  //   dispatch({
  //     type: REDUCER_ACTIONS.QUANTITY,
  //     payload: { ...item, amount: amount },
  //   });
  // };

  return (
    <Card key={item.id} className='restaurant-cart__card '>
      <div className='restaurant-card__img-box'>
        {item.img !== null ? (
          <img src={item.img} className='meal-img' alt={item.name} />
        ) : (
          <img
            src={require(`../../../../../components/no-image.jpg`)}
            className='meal-img'
            alt='not found'
          />
        )}
      </div>
      <div className='restaurant-cart__details'>
        <p className='restaurant-cart__meal-name'>{item.name}</p>
        {/* ingredients */}
        {/* notes */}
      </div>
      <div className='restaurant-cart__price'>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "CAD",
        }).format(item.price)}
      </div>
      <div className='restaurant-cart__quantity'>
        <QuantityControl
          className='cart'
          onDecrement={decrementHandler}
          onIncrement={incrementHandler}
          // onInputChange={amountChangeHandler}
          amount={amount}
        />
      </div>
      <div className='restaurant-cart__subTotal'>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "CAD",
        }).format(subTotal)}
      </div>
    </Card>
  );
};

export default CartItem;
