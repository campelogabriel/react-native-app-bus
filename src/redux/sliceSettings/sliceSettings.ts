import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type typeSettings = {
  darkMode: boolean;
  notificationBusNext: boolean;
  mapStyles: string;
  distanceBus: number;
};

const initialStates: null | typeSettings = {
  darkMode: false,
  notificationBusNext: false,
  mapStyles: "padrao",
  distanceBus: 200,
};

const sliceSettings = createSlice({
  name: "settings",
  initialState: initialStates,
  reducers: {
    setDarkMode(state, { payload }: PayloadAction<boolean>) {
      return { ...state, darkMode: payload };
    },
    setNotificationBusNext(state, { payload }: PayloadAction<boolean>) {
      return { ...state, notificationBusNext: payload };
    },
    setMapStyles(state, { payload }: PayloadAction<string>) {
      return { ...state, mapStyles: payload };
    },
    setDistanceBus(state, { payload }: PayloadAction<number>) {
      return { ...state, distanceBus: payload };
    },
  },
});

export default sliceSettings.reducer;
export const {
  setDarkMode,
  setNotificationBusNext,
  setMapStyles,
  setDistanceBus,
} = sliceSettings.actions;

export const useSettings = (state: any) => {
  return state.settings;
};
