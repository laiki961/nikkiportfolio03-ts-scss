import { useRef, useState } from "react";

const MealForm: React.FC<{
  key: number;
  onAddToCart: () => void;
  //   onIncrement: () => {};
  //   onDecrement: () => {};
}> = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredAmount: string = amountInputRef.current!.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart();
  };

  return (
    <form className='restaurant__cta' onSubmit={submitHandler}>
      <div className='restaurant__quantity-control'>
        <button
          type='button'
          className='restaurant__quantity-control-button'
          //   onClick={decrementHandler.bind(null, props.key)}
        >
          -
        </button>
        <input
          id='meal-quantity'
          ref={amountInputRef}
          type='number'
          defaultValue='1'
          className='restaurant__cta-input'
        ></input>
        <button
          type='button'
          className='restaurant__quantity-control-button'
          //onClick={incrementHandler.bind(null, props.key)}
        >
          +
        </button>
      </div>
      <button type='submit' className='restaurant__cta-button'>
        Add
      </button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealForm;
