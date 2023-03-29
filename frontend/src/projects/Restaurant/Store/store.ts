import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AdminSlice } from "./adminSlice";
import { MealSlice } from "./mealSlice";
import { reservationSlice } from "./reservationSlice";

export const store = configureStore({
  reducer: {
    meals: MealSlice.reducer,
    admin: AdminSlice.reducer,
    reservation: reservationSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
