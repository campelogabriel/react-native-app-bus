import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import Header from "src/components/Header";
import EstiloMapa from "../utils/mapStyle";
import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { addPosition } from "src/redux/slicePositions/slicePositions";
import { useDispatch } from "react-redux";
import { useSettings } from "src/redux/sliceSettings/sliceSettings";

const Page = () => {
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
    // watchPositionAsync(
    //   {
    //     accuracy: LocationAccuracy.Highest,
    //     timeInterval: 1000,
    //     distanceInterval: 1,
    //   },
    //   (response) => {
    //     console.log(response);
    //   }
    // );
  }, []);

  if (!location) return null;

  return (
    <>
      <View style={styles.container}>
        <Header />
        <MapView
          // key={process.env.EXPO_PUBLIC_KEY_GOOGLE_MAPS}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
          customMapStyle={
            settings.darkMode ? EstiloMapa.dark : EstiloMapa[settings.mapStyles]
          }
        >
          <Marker
            coordinate={{
              latitude: -22.48484,
              longitude: -42.48393,
            }}
          />
        </MapView>
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
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Page;
