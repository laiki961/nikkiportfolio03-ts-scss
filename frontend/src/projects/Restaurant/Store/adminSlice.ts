import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductReqDto } from "../domain/dto/backend-dto";

import { AuthState } from "@okta/okta-auth-js";
import { MealItemModel } from "../Models/MealModel";

const baseUrl: string = `${process.env.REACT_APP_RESTAURANT_API}`;

export interface MealItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  img: string;
}

interface MealItemState {
  meals: MealItem[];
  updateMealDetails: MealItemModel | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MealItemState = {
  meals: [],
  updateMealDetails: null,
  status: "idle",
  error: null,
};

function rejectWithValue(message: string) {
  throw new Error("Function not implemented.");
}

export const fetchAllMeals = createAsyncThunk("fetchMeals", async () => {
  try {
    const response = await fetch(`${baseUrl}/productEntities?page=0&size=30`, {
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
        img: responseData[key].img,
      });
    }
    return loadedMeals;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return rejectWithValue(error.message);
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
        console.log(response.ok);
        throw new Error(
          `Request Failed ${response.status}: ${response.statusText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  }
);

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
          img: productReqDto.img,
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
        return rejectWithValue(error.message);
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
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchMealByName = createAsyncThunk(
  "search/name",
  async (name: string) => {
    try {
      const response = await fetch(
        `${baseUrl}/productEntities/search/findByNameContaining?name=${name}`,
        {
          method: "GET",
          headers: {},
          body: null,
        }
      );
      if (!response.ok) {
        console.log(response.ok);
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
          img: responseData[key].img,
        });
      }
      console.log(loadedMeals);
      return loadedMeals;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchMealById = createAsyncThunk(
  "search/Id",
  async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/productEntities/${id}`, {
        method: "GET",
        headers: {},
        body: null,
      });
      if (!response.ok) {
        console.log(response.ok);
        throw new Error(
          `Request Failed ${response.status}: ${response.statusText}`
        );
      }
      const data = await response.json();
      const loadedMeal: MealItemModel = {
        id: data.id,
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        img: data.img,
      };
      console.log(loadedMeal);
      return loadedMeal;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<{ meal: MealItem }>) => {
      const { id, name, description, category, price, img } =
        action.payload.meal;
      state.meals.push({
        id: id,
        name: name,
        description: description,
        category: category,
        price: price,
        img: img,
      });
    },
  },
  extraReducers: (builder) => {
    //fetchAllMeals
    builder.addCase(fetchAllMeals.pending, (state, action) => {
      state.status = "loading";
      console.log(`fetchMeals: loading`);
    });
    builder.addCase(fetchAllMeals.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message) {
        state.error = action.error.message;
      }
      console.log(`fetchMeals: failed`);
    });
    builder.addCase(fetchAllMeals.fulfilled, (state, action) => {
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
      console.log(`removeMealById: fulfilled`);
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

    //addMeal
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
      console.log(`addMeal: fulfilled`);
      state.meals.push(action.payload);
    });

    //fetchMealsByName
    builder.addCase(fetchMealByName.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMealByName.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
    builder.addCase(fetchMealByName.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (typeof action.payload !== "string" && action.payload !== undefined) {
        state.meals = action.payload;
      }
    });

    //fetchMealById
    builder.addCase(fetchMealById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMealById.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
    builder.addCase(fetchMealById.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (typeof action.payload !== "string" && action.payload !== undefined) {
        console.log(action.payload);
        state.updateMealDetails = action.payload;
      }
    });
  },
});

export default AdminSlice.reducer;

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
