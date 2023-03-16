import { ChangeEvent, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import QuantityControl from "../../components /QuantityControl/QuantityControl";
import { CartItemModel } from "../../Models/CartModel";
import { ReducerAction, ReducerActionType } from "../../Store/CartProvider";

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
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, amount: amount },
    });
  }, [amount]);

  const inputValue = (value: number) => {
    setAmount(value);
  };

  const onChangeAmt = (e: ChangeEvent<HTMLButtonElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, amount: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () => {
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });
  };

  const decrementHandler = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  const incrementHandler = () => {
    if (amount < 10) {
      setAmount(amount + 1);
    }
  };
  const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
  };

  return (
    <Card key={item.id} className='restaurant-cart__card '>
      <div className='restaurant-cart__img-box'>
        {/* <img
                src={require("../../images/pad_thai.jpeg")}
                alt={item.name}
                className='meal-img'
              ></img> */}
        <div className='restaurant-cart__detail'>
          <div className='restaurant-cart__meal-name'>{item.name}</div>
          {/* ingredients */}
          {/* notes */}
        </div>
      </div>
      <div className='restaurant-cart__price'>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "CAD",
        }).format(item.price)}
      </div>
      <div className='restaurant-cart__quantity'>
        {/* {item.amount} */}
        <QuantityControl
          className='cart'
          onDecrement={decrementHandler}
          onIncrement={incrementHandler}
          onInputChange={amountChangeHandler}
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
