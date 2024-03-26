import { Animated, Button, StyleSheet, Text, View } from "react-native";
import MapView, {
  AnimatedRegion,
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
import { getRotation } from "src/utils/getRotationBus";

const MarkerAnimated = Animated.createAnimatedComponent(Marker);

const positions: Position = {
  latitude: -22.976767031650564,
  longitude: -43.22994050073355,
};

const finalPositions: Position = {
  latitude: -22.97788320087905,
  longitude: -43.233132329425715,
};

function Page({ location, settings, setTabStyle }) {
  const [modal, setModal] = useState(false);

  //@ts-ignore
  const marker = useRef<MarkerAnimated | null>();

  const [curRot, setCurRot] = useState(0);
  const [coordinates, setCoordinates] = useState(positions);

  const animate = (final: Position) => {
    if (
      coordinates.latitude == final.latitude &&
      coordinates.longitude == final.longitude
    )
      return;
    console.log("old root", curRot);

    const newRoot = getRotation(
      { latitude: coordinates.latitude, longitude: coordinates.longitude },
      final
    );
    console.log("new root", newRoot);
    setCurRot(newRoot);
    setCoordinates(final);

    marker.current.animateMarkerToCoordinate(final, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      animate(finalPositions);
    }, 6000);
  }, []);

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          // latitude: location.coords.latitude,
          // longitude: location.coords.longitude,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
        style={styles.map}
        customMapStyle={EstiloMapa[settings.mapStyles]}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />

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
        />
      </MapView>
      {modal && <ModalBus setModal={setModal} setTabStyle={setTabStyle} />}
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
