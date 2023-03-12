import Card from "../../../components/Card/Card";

const RestaurantHomePage = () => {
  return (
    <div className='restaurant container-sm min-vh-100'>
      <div className='restaurant__menu heading-2'>Testing</div>
      <Card className='restaurant__product-card'>
        <div className='restaurant__product-img-box'>
          <img
            src={require("../Images/pad_thai.jpeg")}
            alt='proudct image'
            className='product-img'
          ></img>
        </div>
        <div className='restaurant__product-detail'>
          <span className='product-name'>Product Name</span>
          <span className='product-ingredients'>Ingredients</span>
          <span className='product-price'>Price</span>
        </div>
        <div className='restaurant__cta'>
          <div className='restaurant__quantity-control'>
            <button className='restaurant__quantity-control-button'>-</button>
            <input className='restaurant__cta-input'></input>
            <button className='restaurant__quantity-control-button'>+</button>
          </div>
          <button className='restaurant__cta-button'>Add</button>
        </div>
      </Card>
    </div>
  );
};

export default RestaurantHomePage;
