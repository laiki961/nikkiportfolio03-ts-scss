import { doesNotMatch } from "assert";
import { ReactElement, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Card from "../../../../components/Card/Card";
import useCart from "../../../../hooks/useCart";
import CartItem from "./CartItem";

export const Cart: React.FC<{}> = () => {
  const [confirm, setConfrim] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const onSubmitOrderHandler = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfrim(true);
    navigate("/restaurant/order");
  };

  const listTitle: ReactElement = (
    <div className='restaurant-cart__card'>
      <span>Item(s)</span>
      <span>Price</span>
      <span>Amount</span>
      <span>Sub Total</span>
    </div>
  );

  let emptyCartContent: ReactElement = <></>;
  if (totalItems === 0) {
    emptyCartContent = (
      <div>
        <p>You have 0 items in cart </p>
        <br />
        <Link className='btn-second' to='/restaurant'>
          Return to the Menu &rarr;
        </Link>
      </div>
    );
  }

  if (confirm) {
    <h2>Thank you for your order</h2>;
  }

  return (
    <section className='restaurant-cart container text-2 min-vh-100'>
      <div className='restaurant-cart__title'>Shopping Cart</div>
      {listTitle}
      <div className='restaurant-cart__list'>
        {emptyCartContent}
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
          />
        ))}
      </div>
      <div className='restaurant-cart__summary'>
        <p>Total Item(s): {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          disabled={isSubmitting || totalItems === 0}
          onClick={onSubmitOrderHandler}
          className='button'
        >
          {isSubmitting ? "loading..." : "Place Order"}
        </button>
      </div>
    </section>
  );
};
