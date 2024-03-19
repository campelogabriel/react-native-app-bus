import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
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

import * as Notifications from "expo-notifications";

const bus = [
  { linha: 538, distancia: 1 },
  { linha: 539, distancia: 5 },
  { linha: 539, distancia: 52 },
];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Notifications.scheduleNotificationAsync({
  content: {
    title: "Ônibus por perto! 🚍",
    body: `Linha(s) ${bus
      .filter((linha) => linha.distancia <= 3)
      .map((bus) => bus.linha)
      .join(",")} a menos de 3 km.`,
  },
  trigger: null,
});

const Page = () => {
  const [location, setLocation] = useState<null | LocationObject>(null);
  const settings = useSelector(useSettings);
  const [permissionNotification, setPermissionNotification] = useState(false);

  const dispatch = useDispatch();

  async function requestLocationPermissions() {
    const positions = await getCurrentPositionAsync();
    setLocation(positions);
    dispatch(
      addPosition([positions.coords.latitude, positions.coords.longitude])
    );
  }

  const getPermissionNotification = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") return;
    setPermissionNotification(true);
  };

  useEffect(() => {
    requestLocationPermissions();
    getPermissionNotification();
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
