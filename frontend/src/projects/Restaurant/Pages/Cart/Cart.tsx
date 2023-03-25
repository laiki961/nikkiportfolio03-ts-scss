import { ReactElement, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import useCart from "../../../../hooks/useCart";
import CartItem from "./components/CartItem";

const Cart: React.FC<{}> = () => {
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const onSubmitOrderHandler = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    navigate("/restaurant/order");
  };

  const listTitle: ReactElement = (
    <div className='restaurant-cart__card cart-title-item'>
      <span></span>
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
        <Link className='restaurant-cart__link-second' to='/restaurant'>
          Return to the Menu &rarr;
        </Link>
      </div>
    );
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
          {isSubmitting ? "loading..." : "Checkout"}
        </button>
      </div>
    </section>
  );
};

export default Cart;
