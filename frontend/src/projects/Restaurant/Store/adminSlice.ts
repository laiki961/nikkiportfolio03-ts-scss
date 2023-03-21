import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductReqDto } from "../domain/dto/backend-dto";

import { AuthState } from "@okta/okta-auth-js";

const baseUrl: string = `${process.env.REACT_APP_RESTAURANT_API}`;

export interface MealItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
}

interface MealItemState {
  meals: MealItem[];
}

const initialState: MealItemState = {
  meals: [],
};

export const fetchMeals = createAsyncThunk("fetchMeals", async () => {
  try {
    const response = await fetch(`${baseUrl}/productEntities?page=0&size=9`, {
      method: "GET",
      headers: {},
      body: null,
    });
    if (!response.ok) {
      throw new Error(
        `Request Failed ${response.status}: ${response.statusText}`
      );
    }
    const data = await response.json();
    const responseData = data._embedded.productEntities;
    const loadedMeals: MealItem[] = [];
    for (const key in responseData) {
      loadedMeals.push({
        id: responseData[key].id,
        name: responseData[key].name,
        description: responseData[key].description,
        category: responseData[key].category,
        price: responseData[key].price,
      });
    }
    return loadedMeals;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return error.message;
    }
  }
});

export const removeMealById = createAsyncThunk(
  "admin/remove-product",
  async (data: { id: number; authState: AuthState }) => {
    const { id, authState } = data;
    try {
      const response = await fetch(
        `${baseUrl}/admin/secure/remove-product?productId=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: "",
          redirect: "follow",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Request Failed ${response.status}: ${response.statusText}`
        );
      }
      return response.json();
      // const status = response.status;
      // return fetchMeals();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return error.message;
      }
    }
  }
);

export const addMeal = createAsyncThunk(
  "admin/add-product",
  async (productReqDto: ProductReqDto) => {
    try {
      const response = await fetch(`${baseUrl}/admin/secure/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productReqDto.name,
          description: productReqDto.description,
          category: productReqDto.category,
          price: productReqDto.price,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Request Failed ${response.status}: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return error.message;
      }
    }
  }
);

export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // addMeal: (state, action: PayloadAction<ProductReqDto>) => {
    //   state.meals.push({
    //     id: Math.floor(Math.random() * Date.now()),
    //     name: action.payload.name,
    //     description: action.payload.description,
    //     category: action.payload.category,
    //     price: action.payload.price,
    //   });
    // },
    // removeMeal: (state, action: PayloadAction<{ id: number }>) => {
    //   const index = state.meals.findIndex(
    //     (meal) => meal.id === action.payload.id
    //   );
    //   console.log(index);
    // },
    // updateMeal: (
    //   state,
    //   action: PayloadAction<{ id: number; productReqDto: ProductReqDto }>
    // ) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMeals.fulfilled, (state, action) => {
      if (typeof action.payload !== "string" && action.payload !== undefined) {
        state.meals = action.payload;
      }
    });

    builder.addCase(removeMealById.fulfilled, (state, action) => {
      const index = state.meals.findIndex(
        (meal) => meal.id === action.payload.id
      );
      console.log(`index: ${index}`);
      state.meals.splice(index, 1);
    });

    // builder.addCase(addMeal.fulfilled, (state, action) => {
    //   state.meals.push(action.payload);
    // });
  },
});

export default AdminSlice.reducer;

// export const { removeMeal } = AdminSlice.actions;

export const selectAllAdmin = (state: any) => state.meals.admin;
