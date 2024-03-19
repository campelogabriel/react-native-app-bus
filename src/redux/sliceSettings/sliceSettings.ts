import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type typeSettings = {
  notificationBusNext: boolean;
  mapStyles: string;
};

const initialStates: null | typeSettings = {
  notificationBusNext: false,
  mapStyles: "padrao",
};

const sliceSettings = createSlice({
  name: "settings",
  initialState: initialStates,
  reducers: {
    setNotificationBusNext(state, { payload }: PayloadAction<boolean>) {
      return { ...state, notificationBusNext: payload };
    },
    setMapStyles(state, { payload }: PayloadAction<string>) {
      return { ...state, mapStyles: payload };
    },
  },
});

export default sliceSettings.reducer;
export const { setNotificationBusNext, setMapStyles } = sliceSettings.actions;

export const useSettings = (state: any) => {
  return state.settings;
};
