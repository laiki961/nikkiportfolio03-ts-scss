import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ReservationInfoRequestDto,
  ReservationInfoResponseDto,
} from "../domain/dto/backend-dto";
const baseUrl: string = `${process.env.REACT_APP_RESTAURANT_API}`;

interface ReservationInfoState {
  bookings: ReservationInfoResponseDto[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReservationInfoState = {
  bookings: [],
  status: "idle",
  error: null,
};

export const fetchBookings = createAsyncThunk("fetchBookings", async () => {
  try {
    const response = await fetch(
      `${baseUrl}/reservationEntities?page=0&size=30`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: null,
      }
    );
    if (!response.ok) {
      throw new Error(
        `Request Failed ${response.status}: ${response.statusText}`
      );
    }
    const data = await response.json();
    const responseBookings = data._embedded.reservationEntities;
    const formattedBookings: ReservationInfoResponseDto[] = [];
    for (const key in responseBookings) {
      formattedBookings.push({
        id: responseBookings[key].id,
        name: responseBookings[key].name,
        contact: responseBookings[key].contact,
        email: responseBookings[key].email,
        time: new Date(responseBookings[key].dateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: new Date(responseBookings[key].dateTime).toLocaleDateString(
          "en-GB",
          {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        ),
        persons: responseBookings[key].persons,
      });
    }
    return formattedBookings;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return error.message;
    }
  }
});

export const makeReservation = createAsyncThunk(
  "makeReservation",
  async (reservationInfoRequestDto: ReservationInfoRequestDto) => {
    try {
      const response = await fetch(`${baseUrl}/reservation/make-reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: reservationInfoRequestDto.name,
          contact: reservationInfoRequestDto.contact,
          email: reservationInfoRequestDto.email,
          date: reservationInfoRequestDto.date,
          time: reservationInfoRequestDto.time,
          persons: reservationInfoRequestDto.persons,
        }),
      });
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

export const fetchBookingsById = createAsyncThunk(
  "fetchBookingsById",
  async () => {
    try {
      const response = await fetch(
        `${baseUrl}/reservationEntities?page=0&size=30`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: null,
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

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //makeReservation
    builder.addCase(makeReservation.pending, (state, action) => {
      state.status = "loading";
      console.log(`makeReservation: loading`);
    });
    builder.addCase(makeReservation.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message !== undefined) {
        state.error = action.error.message;
      }
      console.log(`makeReservation: failed`);
    });
    builder.addCase(makeReservation.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log(`makeReservation:  fulfilled`);
      if (typeof action.payload !== "string" && action.payload !== undefined) {
        state.bookings = action.payload;
      }
    });

    //fetchBookings
    builder.addCase(fetchBookings.pending, (state, action) => {
      state.status = "loading";
      console.log(`fetchBookings: loading`);
    });
    builder.addCase(fetchBookings.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message !== undefined) {
        state.error = action.error.message;
      }
      console.log(`fetchBookings: failed`);
    });
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log(`fetchBookings:  fulfilled`);
      if (typeof action.payload !== "string" && action.payload !== undefined) {
        state.bookings = action.payload;
      }
    });
  },
});
