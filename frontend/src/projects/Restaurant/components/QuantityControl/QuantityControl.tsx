import React, { ReactNode, useEffect, useState } from "react";

interface Props {
  className: string;
  onDecrement: () => void;
  onIncrement: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  amount: number;
}
const QuantityControl: React.FC<Props> = (props) => {
  return (
    <div className={`restaurant-card__quantity-control ${props.className}`}>
      <button
        type='button'
        className='restaurant-card__quantity-control-button'
        onClick={props.onDecrement}
      >
        -
      </button>
      <input
        id='meal-quantity'
        onChange={props.onInputChange}
        value={props.amount}
        // type='number'
        type='text'
        min='1'
        max='10'
        className='restaurant-card__cta-input'
      ></input>
      <button
        type='button'
        className='restaurant-card__quantity-control-button'
        onClick={props.onIncrement}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
