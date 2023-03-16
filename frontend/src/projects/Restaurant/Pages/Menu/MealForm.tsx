import { useRef, useState } from "react";
import QuantityControl from "../../components /QuantityControl/QuantityControl";

const MealForm: React.FC<{
  key: number;
  onAddToCart: () => void;
  inCart: boolean;
  //   onIncrement: () => {};
  //   onDecrement: () => {};
}> = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const itemInCart = props.inCart ? (
    <p className='restaurant-card__noti'>Item in Cart 🛒</p>
  ) : null;

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
    <form className='restaurant-card__cta' onSubmit={submitHandler}>
      <div className='restaurant-card__cta-meun'>
        <QuantityControl ref={amountInputRef} className='menu' />
        <button type='submit' className='restaurant-card__cta-button'>
          Add
        </button>
        {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        {itemInCart}
      </div>
    </form>
  );
};

export default MealForm;
