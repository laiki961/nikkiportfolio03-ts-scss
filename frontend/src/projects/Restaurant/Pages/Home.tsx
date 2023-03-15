import { useLoaderData, json } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import Meal from "./Menu/components/Meal";
import MealModel from "../models/MealModel";
import { useContext } from "react";
import MealsContext from "../store/MealProvider";

export const Home = () => {
  // const meals: MealModel[] | any = useLoaderData();
  const meals = useContext(MealsContext);

  return (
    <div className='restaurant container-sm min-vh-100'>
      <div className='restaurant__menu heading-2'>Meun Selection</div>
      {meals.productEntities.map((meal: MealModel) => (
        <Meal meal={meal} key={meal.id} />
      ))}
    </div>
  );
};

// export async function loader() {
//   const baseUrl: string = `${process.env.REACT_APP_RESTAURANT_API}/productEntities`;
//   const url: string = `${baseUrl}?page=0&size=9`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw json({ message: "Could not fetch events" }, { status: 500 });
//     // throw new Error(
//     //   `Request Failed ${response.status}: ${response.statusText}`
//     // );
//   }
//   const responseJson = await response.json();
//   const responseData = responseJson._embedded.productEntities;

//   const loadedMeals: MealModel[] = [];
//   for (const key in responseData) {
//     loadedMeals.push({
//       id: responseData[key].id,
//       name: responseData[key].name,
//       description: responseData[key].description,
//       category: responseData[key].category,
//       price: responseData[key].price,
//     });
//   }
//   return responseData;
// }
