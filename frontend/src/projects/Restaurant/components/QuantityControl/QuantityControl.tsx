import React, { ReactNode, useEffect, useState } from "react";

interface Props {
  className: string;
  // onValueChange: (value: number) => void;
  onDecrement: () => void;
  onIncrement: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  amount: number;
}

// const QuantityControl = React.forwardRef<HTMLInputElement | null, Props>(
//   (props, ref) => {
const QuantityControl: React.FC<Props> = (props) => {
  // const [amount, setAmount] = useState<number>(1);

  // useEffect(() => {
  //   props.onValueChange(amount);
  // }, [amount]);

  // const decrementHandler = () => {
  //   if (amount > 1) {
  //     setAmount(amount - 1);
  //   }
  // };
  // const incrementHandler = () => {
  //   setAmount(amount + 1);
  // };
  // const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAmount(+e.target.value);
  // };

  return (
    <div className={`restaurant-card__quantity-control ${props.className}`}>
      <button
        type='button'
        className='restaurant-card__quantity-control-button'
        onClick={props.onDecrement}
        //   onClick={decrementHandler.bind(null, props.key)}
      >
        -
      </button>
      <input
        id='meal-quantity'
        onChange={props.onInputChange}
        value={props.amount}
        type='number'
        min='1'
        max='10'
        className='restaurant-card__cta-input'
      ></input>
      <button
        type='button'
        className='restaurant-card__quantity-control-button'
        onClick={props.onIncrement}
        //onClick={incrementHandler.bind(null, props.key)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
