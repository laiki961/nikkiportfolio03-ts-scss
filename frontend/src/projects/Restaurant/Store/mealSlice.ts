import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

function rejectWithValue(message: string): any {
  throw new Error("Function not implemented.");
}

export const fetchMeals = createAsyncThunk("fetchMeals", async () => {
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
      });
    }
    return loadedMeals;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
});

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
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchMealByCategory = createAsyncThunk(
  "search/category",
  async (category: string) => {
    try {
      const response = await fetch(
        `${baseUrl}/productEntities/search/findByCategory?category=${category}`,
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
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const MealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetchMeals
    builder.addCase(fetchMeals.pending, (state) => {
      state.status = "loading";
      console.log(`fetchMeals: loading`);
    });
    builder.addCase(fetchMeals.rejected, (state, action) => {
      state.status = "failed";
      console.log(`fetchMeals: failed`);
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
    builder.addCase(fetchMeals.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (typeof action.payload !== "string" && action.payload !== undefined) {
        state.meals = action.payload;
      }
    });

    //fetchMealsByName
    builder.addCase(fetchMealByName.pending, (state) => {
      state.status = "loading";
      console.log(`fetchMealByName: loading`);
    });
    builder.addCase(fetchMealByName.rejected, (state, action) => {
      state.status = "failed";
      console.log(`fetchMealByName: failed`);
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

    //fetchMealByCategory
    builder.addCase(fetchMealByCategory.pending, (state) => {
      state.status = "loading";
      console.log(`fetchMealByCategory: loading`);
    });
    builder.addCase(fetchMealByCategory.rejected, (state, action) => {
      state.status = "failed";
      console.log(`fetchMealByCategory: failed`);
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
    builder.addCase(fetchMealByCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (typeof action.payload !== "string" && action.payload !== undefined) {
        state.meals = action.payload;
      }
    });
  },
});

export default MealSlice.reducer;

export const selectAllMeal = (state: any) => state.meals.meal;
