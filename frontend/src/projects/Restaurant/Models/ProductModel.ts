class ProductModel {
  id: number;
  name: string;
  ingredients: string[];
  category: string;
  img?: string;
  price: number;

  constructor(
    id: number,
    name: string,
    ingredients: string[],
    category: string,
    img: string,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.category = category;
    this.img = img;
    this.price = price;
  }
}

export default ProductModel;
