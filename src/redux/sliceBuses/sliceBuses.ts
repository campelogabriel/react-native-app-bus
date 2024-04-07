import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bus } from "src/types/BusType";
import { getRotation } from "src/utils/getRotationBus";

const initialStates: Bus[] | any | null = [];

const sliceBuses = createSlice({
  name: "buses",
  initialState: initialStates,
  reducers: {
    addBus(state, { payload }: PayloadAction<Bus>) {
      //Pegar o bus que tem o mesmo numero na carroceria
      let busOld = state.find((bus) => bus.ordem == payload.ordem);

      let busUpdated;
      //verifica se existe
      if (busOld) {
        busUpdated = {
          ordem: busOld.ordem,
          linha: busOld.linha,
          count: busOld.count + 1,
          backgroundColor: busOld.backgroundColor,
          textColor: busOld.textColor,
          trajeto: busOld.trajeto,
          latitude: payload.latitude,
          longitude: payload.longitude,
          distanciaKm: payload.distanciaKm,
          velocidade: payload.velocidade,
          datahora: payload.datahora,
          root: getRotation(
            {
              latitude: Number(busOld.latitude.replace(",", ".")),
              longitude: Number(busOld.longitude.replace(",", ".")),
            },
            {
              latitude: Number(payload.latitude.replace(",", ".")),
              longitude: Number(payload.longitude.replace(",", ".")),
            }
          ),
        };

        const newState = state.filter((bus) => bus.ordem !== payload.ordem);
        return [...newState, busUpdated];
      } else {
        const newState = state.filter((bus) => bus.ordem !== payload.ordem);
        const busNew = { ...payload, count: 1 };
        return [...newState, busNew];
      }
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
