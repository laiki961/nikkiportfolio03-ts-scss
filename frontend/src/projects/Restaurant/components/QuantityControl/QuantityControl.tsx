import React from "react";

interface Props {
  className: string;
  onDecrement: () => void;
  onIncrement: () => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  amount: number;
}

const QuantityControl: React.FC<Props> = (props) => {
  return (
    <div className={`menu-card__quantity-control ${props.className}`}>
      <button
        type='button'
        className='menu-card__quantity-control-button'
        onClick={props.onDecrement}
      >
        -
      </button>
      {props.className === "cart" ? (
        <span className='cart-amount'>{props.amount}</span>
      ) : (
        <input
          id='meal-quantity'
          onChange={props.onInputChange}
          value={props.amount}
          type='text'
          className='menu-card__cta-input'
        ></input>
      )}
      <button
        type='button'
        className='menu-card__quantity-control-button'
        onClick={props.onIncrement}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
