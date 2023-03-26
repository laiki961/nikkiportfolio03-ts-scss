import { useEffect, useState } from "react";
import QuantityControl from "../../../components/QuantityControl/QuantityControl";

const MenuForm: React.FC<{
  key: number;
  onAddToCart: (amount: number) => void;
  inCart: boolean;
  className: string;
}> = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [amount, setAmount] = useState<number>(1);

  const itemInCart = props.inCart ? (
    <p className='menu-card__noti'>Item in Cart 🛒</p>
  ) : null;

  const blurHandler = () => {
    setAmountIsValid(false);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (amount === 0 || amount < 1 || amount > 5) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(amount);
  };

  const inputValue = (value: number) => {
    setAmount(value);
  };

  ///////////

  useEffect(() => {
    inputValue(amount);
  }, [amount]);

  const decrementHandler = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  const incrementHandler = () => {
    if (amount < 5) {
      setAmount(amount + 1);
    }
  };
  const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
  };

  return (
    <form className='menu-card__cta' onSubmit={submitHandler}>
      <div className='menu-card__cta-menu'>
        <QuantityControl
          className='menu'
          onDecrement={decrementHandler}
          onIncrement={incrementHandler}
          onInputChange={amountChangeHandler}
          amount={amount}
        />
        <button type='submit' className='menu-card__cta-button'>
          Add To Cart
        </button>
        {!amountIsValid && (
          <p className='menu-card__noti'>Please enter a valid amount (1-5).</p>
        )}
        {itemInCart}
      </div>
    </form>
  );
};

export default MenuForm;
