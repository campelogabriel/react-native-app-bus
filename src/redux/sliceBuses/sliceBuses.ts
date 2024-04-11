import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bus } from "src/types/BusType";
import { getDifference } from "src/utils/getDifference";
import { getRotation } from "src/utils/getRotationBus";

const initialStates: Bus[] | any | null = [];

const sliceBuses = createSlice({
  name: "buses",
  initialState: initialStates,
  reducers: {
    addBus(state, { payload }: PayloadAction<Bus>) {
      //Pegar o bus que tem o mesmo numero na carroceria
      let busOld = state.find((bus) => bus.ordem == payload.ordem);

      let isLowerThan5Meters;
      let isSamePosition;

      //Verifica se a atualização foi menor que 10 metros
      if (busOld) {
        isLowerThan5Meters =
          getDifference(
            Number(busOld.latitude.replace(",", ".")),
            Number(payload.latitude.replace(",", ".")),
            Number(busOld.longitude.replace(",", ".")),
            Number(payload.longitude.replace(",", "."))
          ) < 0.01;

        isSamePosition =
          busOld.latitude == Number(payload.latitude.replace(",", ".")) &&
          busOld.longitude == Number(payload.longitude.replace(",", "."));
      }

      let busUpdated;
      //verifica se existe
      if (busOld) {
        busUpdated = {
          ordem: busOld.ordem,
          linha: busOld.linha,
          count: isLowerThan5Meters ? busOld.count : busOld.count + 1,
          backgroundColor: busOld.backgroundColor,
          textColor: busOld.textColor,
          trajeto: busOld.trajeto,
          latitude: isLowerThan5Meters ? busOld.latitude : payload.latitude,
          longitude: isLowerThan5Meters ? busOld.longitude : payload.longitude,
          distanciaKm: payload.distanciaKm,
          velocidade: payload.velocidade,
          datahora: payload.datahora,
          root: isLowerThan5Meters
            ? busOld.root
            : getRotation(
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
