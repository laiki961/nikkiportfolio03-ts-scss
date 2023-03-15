import { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Card from "../../../../components/Card/Card";
import useCart from "../../../../hooks/useCart";

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

  if (confirm) {
    <h2>Thank you for your order</h2>;
  }

  return (
    <section className='restaurant-cart container text-2 min-vh-100'>
      <div className='restaurant-cart__title'>Shopping Cart</div>
      <div className='restaurant-cart__list'>
        {totalItems === 0 && (
          <div>
            <p>You have 0 items in cart </p>
            <br />
            <Link to='/restaurant'>Return to the Menu &rarr;</Link>
          </div>
        )}
        {cart.map((item) => {
          return (
            <Card key={item.id} className='restaurant-card'>
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>{item.amount}</div>
            </Card>
          );
        })}
      </div>

      <div className='restaurant-cart__summary'>
        {/* <div> */}
        <span>Total Item(s): {totalItems}</span>
        <span>Total Price: {totalPrice}</span>
        {/* </div> */}
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
