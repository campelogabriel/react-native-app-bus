import { StyleSheet, Text, View } from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  // MarkerAnimated,
} from "react-native-maps";
import EstiloMapa from "../utils/mapStyle";
import { useEffect, useState } from "react";
import { Position } from "src/types/PositionType";
import ModalBus from "./ModalBus";

import MarkerCustom from "./MarkerCustom";

// @ts-ignore
import { useSelector } from "react-redux";
import { useBuses } from "src/redux/sliceBuses/sliceBuses";
import { useSettings } from "src/redux/sliceSettings/sliceSettings";
import { Bus } from "src/types/BusType";

const finalPositions: Position = {
  latitude: -22.976767031650564,
  longitude: -43.22994050073355,
};

const positions: Position = {
  latitude: -22.97788320087905,
  longitude: -43.233132329425715,
};

function Page({ location, setTabStyle }) {
  const [modalOrdem, setModalOrdem] = useState("");
  const [modalInfoBus, setModalInfoBus] = useState<Bus>();
  const [modal, setModal] = useState(false);
  const settings = useSelector(useSettings);
  const [testCoords, setTestCoords] = useState<Position>(positions);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // console.log("updated on Parent");
  //     setTestCoords(finalPositions);
  //   }, 2000);
  // }, []);

  //PEGAR ONIBUS NO REDUX
  // const buses = useSelector(useBuses);
  // console.log("buses to mapCustom", buses);
  const buses = [
    {
      ordem: "A41082",
      linha: "112",
      latitude: "-22,91056",
      longitude: "-43,18832",
      distanciaKm: "NaN",
      velocidade: "9",
      datahora: "1711823965000",
      backgroundColor: "FCC417",
      textColor: "000000",
      trajeto: "Rodoviária - Alto Gávea",
    },
    {
      ordem: "A41083",
      linha: "112",
      latitude: "-22,96081",
      longitude: "-43,2075",
      distanciaKm: "NaN",
      velocidade: "29",
      datahora: "1711823965000",
      backgroundColor: "FCC417",
      textColor: "000000",
      trajeto: "Rodoviária - Alto Gávea",
    },
    {
      ordem: "C41411",
      linha: "112",
      latitude: "-22,89955",
      longitude: "-43,21157",
      distanciaKm: "NaN",
      velocidade: "0",
      datahora: "1711823965000",
      backgroundColor: "FCC417",
      textColor: "000000",
      trajeto: "Rodoviária - Alto Gávea",
    },
    {
      ordem: "A41059",
      linha: "112",
      latitude: "-22,97613",
      longitude: "-43,22803",
      distanciaKm: "NaN",
      velocidade: "0",
      datahora: "1711823965000",
      backgroundColor: "FCC417",
      textColor: "000000",
      trajeto: "Rodoviária - Alto Gávea",
    },
    {
      ordem: "A41060",
      linha: "112",
      latitude: "-22,89954",
      longitude: "-43,212",
      distanciaKm: "NaN",
      velocidade: "0",
      datahora: "1711823965000",
      backgroundColor: "FCC417",
      textColor: "000000",
      trajeto: "Rodoviária - Alto Gávea",
    },
  ];
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        // key={process.env.EXPO_PUBLIC_KEY_GOOGLE_MAPS}
        initialRegion={{
          latitude: location.at(0),
          longitude: location.at(1),
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
        style={styles.map}
        customMapStyle={EstiloMapa[settings.mapStyles]}
      >
        {/* User Position */}
        <Marker
          coordinate={{
            latitude: location.at(0),
            longitude: location.at(1),
          }}
        >
          <Callout tooltip>
            <View
              style={{
                marginVertical: 12,
                backgroundColor: "#0e997d",
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: "#eee" }}>Você</Text>
            </View>
          </Callout>
        </Marker>

        {buses.map((bus) => {
          const latitude = Number(bus.latitude.replace(",", "."));
          const longitude = Number(bus.longitude.replace(",", "."));

          console.log("latt", latitude);
          return (
            <MarkerCustom
              key={bus.ordem}
              bus={bus}
              coords={{ latitude, longitude }}
              setModal={setModal}
              setTabStyle={setTabStyle}
              setModalInfoBus={setModalInfoBus}
            />
          );
        })}
        {/* <MarkerCustom
          coords={testCoords}
          setModal={setModal}
          setTabStyle={setTabStyle}
        /> */}
      </MapView>
      {modal && (
        <ModalBus
          modalInfoBus={modalInfoBus}
          setModal={setModal}
          setTabStyle={setTabStyle}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Page;
