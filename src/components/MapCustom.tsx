import { Animated, Button, StyleSheet, Text, View } from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  // MarkerAnimated,
} from "react-native-maps";
import EstiloMapa from "../utils/mapStyle";
import { useEffect, useRef, useState } from "react";
import { Position } from "src/types/PositionType";
import ModalBus from "./ModalBus";

// @ts-ignore
import carIcon from "../../assets/00016.png";
import { useSelector } from "react-redux";
import { useBuses } from "src/redux/sliceBuses/sliceBuses";
import { useSettings } from "src/redux/sliceSettings/sliceSettings";
import getBusByLine from "src/utils/getBusLByLine";
import { useLines } from "src/redux/sliceLines/sliceLines";

const MarkerAnimated = Animated.createAnimatedComponent(Marker);

const positions: Position = {
  latitude: -22.976767031650564,
  longitude: -43.22994050073355,
};

const finalPositions: Position = {
  latitude: -22.97788320087905,
  longitude: -43.233132329425715,
};

function Page({ location, setTabStyle }) {
  const [modal, setModal] = useState(false);
  const settings = useSelector(useSettings);

  //PEGAR ONIBUS NO REDUX
  const buses = useSelector(useBuses);
  const busLines = useSelector(useLines);

  //@ts-ignore
  const marker = useRef<MarkerAnimated | null>();

  const [curRot, setCurRot] = useState(0);
  const [coordinates, setCoordinates] = useState(positions);

  useEffect(() => {
    getBusByLine(busLines, location)
      .then((veiculos) => console.log("v", veiculos))
      .catch((err) => console.log("err: ", err));
  }, []);

  // const animate = (final: Position) => {
  //   if (
  //     coordinates.latitude == final.latitude &&
  //     coordinates.longitude == final.longitude
  //   )
  //     return;

  //   const newRoot = getRotation(
  //     { latitude: coordinates.latitude, longitude: coordinates.longitude },
  //     final
  //   );
  //   setCurRot(newRoot);
  //   setCoordinates(final);

  //   marker.current.animateMarkerToCoordinate(final, 500);
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     animate(finalPositions);
  //   }, 6000);
  // }, []);

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        // key={process.env.EXPO_PUBLIC_KEY_GOOGLE_MAPS}
        toolbarEnabled
        initialRegion={{
          latitude: location.at(0),
          longitude: location.at(1),
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
        style={styles.map}
        customMapStyle={EstiloMapa[settings.mapStyles]}
      >
        <Marker
          coordinate={{
            latitude: location.at(0),
            longitude: location.at(1),
          }}
        ></Marker>

        <MarkerAnimated
          ref={(el) => (marker.current = el)}
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={coordinates}
          rotation={curRot}
          image={carIcon}
          flat={true}
          tracksViewChanges={true}
          onPress={() => {
            setModal(true);
            setTabStyle(false);
          }}
        >
          <Callout style={{ position: "absolute", top: 0, left: 10 }} tooltip>
            <View
              style={{
                backgroundColor: "#FCC417",
                padding: 8,
                borderRadius: 12,
                elevation: 3,
                borderWidth: 1,
                borderColor: "#ccc",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
            >
              <Text style={{ color: "#000" }}>Linha 538</Text>
            </View>
          </Callout>
        </MarkerAnimated>
      </MapView>
      {modal && <ModalBus setModal={setModal} setTabStyle={setTabStyle} />}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
});

export default Page;
