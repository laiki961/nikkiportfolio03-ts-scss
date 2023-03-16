import { useRef, useState } from "react";
import QuantityControl from "../../components /QuantityControl/QuantityControl";

const MealForm: React.FC<{
  key: number;
  onAddToCart: (amount: number) => void;
  inCart: boolean;
}> = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  // const amountInputRef = useRef<HTMLInputElement>(null);
  const [amount, setAmount] = useState<number>(1);

  const itemInCart = props.inCart ? (
    <p className='restaurant-card__noti'>Item in Cart 🛒</p>
  ) : null;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // const enteredAmount: string = amountInputRef.current!.value;
    // const enteredAmountNumber = +enteredAmount;

    if (amount === 0 || amount < 1 || amount > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(amount);
  };

  const inputValue = (value: number) => {
    setAmount(value);
  };

  return (
    <form className='restaurant-card__cta' onSubmit={submitHandler}>
      <div className='restaurant-card__cta-meun'>
        <QuantityControl
          onValueChange={inputValue}
          // ref={amountInputRef}
          className='menu'
        />
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
