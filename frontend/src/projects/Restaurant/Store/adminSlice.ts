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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MealItemState = {
  meals: [],
  status: "idle",
  error: null,
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
  async (data: { id: number; authState: AuthState }, thunkAPI) => {
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
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return error.message;
      }
    }
  }
);

//ToDo
export const addMeal = createAsyncThunk(
  "admin/add-product",
  async (data: { productReqDto: ProductReqDto; authState: AuthState }) => {
    const { productReqDto, authState } = data;
    try {
      const response = await fetch(`${baseUrl}/admin/secure/add-product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
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

export const updateMeal = createAsyncThunk(
  "admin/update-product",
  async (data: {
    id: number;
    productReqDto: ProductReqDto;
    authState: AuthState;
  }) => {
    const { id, productReqDto, authState } = data;
    try {
      const response = await fetch(
        `${baseUrl}/admin/secure/update-product?productId=${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: productReqDto.name,
            description: productReqDto.description,
            category: productReqDto.category,
            price: productReqDto.price,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Request Failed ${response.status}: ${response.statusText}`
        );
      }
      const data = await response.json();
      return data;
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
  reducers: {},
  extraReducers: (builder) => {
    //fetchMeals
    builder.addCase(fetchMeals.pending, (state, action) => {
      state.status = "loading";
      console.log(`fetchMeals: loading`);
    });
    builder.addCase(fetchMeals.rejected, (state, action) => {
      state.status = "failed";
      console.log(`fetchMeals: failed`);
    });
    builder.addCase(fetchMeals.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (typeof action.payload !== "string" && action.payload !== undefined) {
        state.meals = action.payload;
      }
    });

    //removeMealById
    builder.addCase(removeMealById.pending, (state, action) => {
      state.status = "loading";
      console.log(`removeMealById: loading`);
    });
    builder.addCase(removeMealById.rejected, (state, action) => {
      state.status = "failed";
      console.log(`removeMealById: failed`);
    });
    builder.addCase(removeMealById.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.meals.findIndex(
        (meal) => meal.id === action.payload.id
      );
      state.meals.splice(index, 1);
    });

    //updateMeal
    builder.addCase(updateMeal.pending, (state, action) => {
      state.status = "loading";
      console.log(`updateMeal: loading`);
    });
    builder.addCase(updateMeal.rejected, (state, action) => {
      state.status = "failed";
      console.log(`updateMeal: failed`);
    });
    builder.addCase(updateMeal.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.meals.findIndex(
        (meal) => meal.id === action.payload.id
      );
      state.meals[index] = action.payload;
    });

    //add meal
    builder.addCase(addMeal.pending, (state, action) => {
      state.status = "loading";
      console.log(`addMeal: loading`);
    });
    builder.addCase(addMeal.rejected, (state, action) => {
      state.status = "succeeded";
      console.log(`addMeal: failed`);
    });
    builder.addCase(addMeal.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.meals.push(action.payload);
    });
  },
});

export default AdminSlice.reducer;

// export const { removeMeal } = AdminSlice.actions;

export const selectAllAdmin = (state: any) => state.meals.admin;
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
