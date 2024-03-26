import { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Header from "src/components/Header";
import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { addPosition } from "src/redux/slicePositions/slicePositions";
import { useDispatch } from "react-redux";
import { useSettings } from "src/redux/sliceSettings/sliceSettings";
import MapCustom from "../components/MapCustom";

const Page = ({ data }) => {
  const [location, setLocation] = useState<null | LocationObject>(null);
  const settings = useSelector(useSettings);
  const dispatch = useDispatch();

  async function requestLocationPermissions() {
    const positions = await getCurrentPositionAsync();
    setLocation(positions);
    dispatch(
      addPosition([positions.coords.latitude, positions.coords.longitude])
    );
  }
  useEffect(() => {
    requestLocationPermissions();
  }, []);

  if (!location) return null;

  return (
    <>
      <View style={styles.container}>
        <Header />
        <MapCustom
          setTabStyle={data.setIsFlex}
          location={location}
          settings={settings}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
