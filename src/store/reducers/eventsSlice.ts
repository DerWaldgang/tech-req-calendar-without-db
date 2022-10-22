import { IUser, IEvent } from "./../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEventsInitialState {
  guests: IUser[];
  events: IEvent[];
}

const initialState: IEventsInitialState = {
  guests: [],
  events: [],
};

const eventsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addGuests: (state, action: PayloadAction<IUser>) => {
      state.guests.push(action.payload);
    },
    addEvents: (state, action: PayloadAction<IEvent>) => {
      state.events.push(action.payload);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    reAddEvents: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload;
    },
  },
});

export const { addGuests, addEvents, reAddEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
