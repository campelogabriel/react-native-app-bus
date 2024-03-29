import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bus } from "src/types/BusType";

const initialStates: Bus[] | any | null = [{}];

const sliceBuses = createSlice({
  name: "buses",
  initialState: initialStates,
  reducers: {
    addBus(state, { payload }: PayloadAction<Bus>) {
      const newState = state.filter((bus) => bus.ordem !== payload.ordem);
      return [...newState, payload];
    },
    removeBus(state, { payload }: PayloadAction<Bus>) {
      const filtered = state.filter((bus) => bus.ordem !== payload.ordem);
      return [...filtered];
    },
  },
});

export default sliceBuses.reducer;
export const { addBus, removeBus } = sliceBuses.actions;

export const useBuses = (state: any) => {
  return state.buses;
};
