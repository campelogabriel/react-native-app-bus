import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import { useSettings } from "src/redux/sliceSettings/sliceSettings";
import { Position } from "src/types/PositionType";

//@ts-ignore
import icon from "../../assets/userIcon.png";
import { useDispatch } from "react-redux";
import {
  addPosition,
  usePositions,
} from "src/redux/slicePositions/slicePositions";

function Page() {
  const settings = useSelector(useSettings);
  const position = useSelector(usePositions);

  const [coords, setCoords] = useState<Position | null>();

  useEffect(() => {
    setCoords({ latitude: position[0], longitude: position[1] });
  }, []);

  const dispatch = useDispatch();

  function handleDrag(e) {
    setCoords(e.nativeEvent.coordinate);
    dispatch(
      addPosition([
        e.nativeEvent.coordinate.latitude,
        e.nativeEvent.coordinate.longitude,
      ])
    );
  }

  if (!coords) return;

  return (
    <MapView
      mapType={settings.mapStyles}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      }}
    >
      <Marker
        draggable
        coordinate={{ latitude: coords.latitude, longitude: coords.longitude }}
        onDragEnd={handleDrag}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    borderWidth: 1,
    borderColor: "blue",
    width: "100%",
    height: "80%",
  },
});

export default Page;
