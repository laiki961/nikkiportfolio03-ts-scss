export type CartItemModel = {
  id: number;
  name: string;
  price: number;
  amount: number;
  subTotal: number;
};

class CartModel {
  id: number;
  meals: CartItemModel[];
  totalPrice: number;
  totalAmount: number;

  constructor(
    id: number,
    meals: CartItemModel[],
    totalPrice: number,
    totalAmount: number
  ) {
    this.id = id;
    this.meals = meals;
    this.totalPrice = totalPrice;
    this.totalAmount = totalAmount;
  }
}

export default CartModel;
