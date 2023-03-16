import React, { ReactNode, useEffect, useState } from "react";

interface Props {
  className: string;
  onValueChange: (value: number) => void;
}

// const QuantityControl = React.forwardRef<HTMLInputElement | null, Props>(
//   (props, ref) => {
const QuantityControl: React.FC<Props> = (props) => {
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    props.onValueChange(amount);
  }, [amount]);

  const decrementHandler = () => {
    setAmount(amount - 1);
  };
  const incrementHandler = () => {
    setAmount(amount + 1);
  };
  const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
  };

  return (
    <div className={`restaurant-card__quantity-control ${props.className}`}>
      <button
        type='button'
        className='restaurant-card__quantity-control-button'
        onClick={decrementHandler}
        //   onClick={decrementHandler.bind(null, props.key)}
      >
        -
      </button>
      <input
        id='meal-quantity'
        onChange={amountChangeHandler}
        // ref={ref}
        value={amount}
        type='number'
        min='1'
        max='10'
        className='restaurant-card__cta-input'
      ></input>
      <button
        type='button'
        className='restaurant-card__quantity-control-button'
        onClick={incrementHandler}
        //onClick={incrementHandler.bind(null, props.key)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
