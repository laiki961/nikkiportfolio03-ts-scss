import React, { ReactNode } from "react";

interface Props {
  className: string;
}

const QuantityControl = React.forwardRef<HTMLInputElement | null, Props>(
  (props, ref) => {
    return (
      <div className={`restaurant-card__quantity-control ${props.className}`}>
        <button
          type='button'
          className='restaurant-card__quantity-control-button'
          //   onClick={decrementHandler.bind(null, props.key)}
        >
          -
        </button>
        <input
          id='meal-quantity'
          ref={ref}
          type='number'
          defaultValue='1'
          className='restaurant-card__cta-input'
        ></input>
        <button
          type='button'
          className='restaurant-card__quantity-control-button'
          //onClick={incrementHandler.bind(null, props.key)}
        >
          +
        </button>
      </div>
    );
  }
);

export default QuantityControl;
