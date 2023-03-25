export type MealItemModel = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  img: string;
};

class MealModel {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  img?: string;

  constructor(
    id: number,
    name: string,
    description: string,
    category: string,
    price: number,
    img?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.img = img;
  }
}

export default MealModel;
