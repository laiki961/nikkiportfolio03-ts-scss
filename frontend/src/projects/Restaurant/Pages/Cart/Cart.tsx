import Card from "../../../../components/Card/Card";

export const Cart: React.FC<{}> = () => {
  return (
    <section className='restaurant-cart container text-2 min-vh-100'>
      Your Shopping Cart
      <Card>Item 1</Card>
      <Card>Item 2</Card>
      <Card>Item 3</Card>
    </section>
  );
};
