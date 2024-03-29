import { configureStore } from "@reduxjs/toolkit";
import lineReducer from "./sliceLines/sliceLines";
import positionReducer from "./slicePositions/slicePositions";
import settingsReducer from "./sliceSettings/sliceSettings";
import busesReducer from "./sliceBuses/sliceBuses";

export const store = configureStore({
  reducer: {
    lines: lineReducer,
    positions: positionReducer,
    settings: settingsReducer,
    buses: busesReducer,
  },
});

export default store;
