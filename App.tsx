import { useEffect, useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import store from "src/redux/store";
import NotAllowed from "src/components/Permition/NotAllowed";
import NoLocal from "src/components/Permition/NoLocal";
import LottieViewBus from "src/components/LottieViewBus";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { LogBox } from "react-native";
import Application from "src/Application";
LogBox.ignoreAllLogs();

const queryClient = new QueryClient({});

export default function App() {
  const [isPermissionLocation, setIsPermissionLocation] = useState<
    boolean | null
  >(null);
  const [location, setLocation] = useState<LocationObject | boolean | null>(
    null
  );

  async function requestLocationPermissions() {
    try {
      const positions = await getCurrentPositionAsync();
      setLocation(positions);
    } catch (err) {
      setLocation(false);
    }
  }

  const getPermissionLocation = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      setIsPermissionLocation(true);
      requestLocationPermissions();
    } else {
      setIsPermissionLocation(false);
    }
  };

  useEffect(() => {
    getPermissionLocation();
  }, []);

  if (location == false)
    return <NoLocal requestLocationPermissions={requestLocationPermissions} />;

  if (isPermissionLocation == false)
    return <NotAllowed getPermissionLocation={getPermissionLocation} />;

  if (!isPermissionLocation || !location) return <LottieViewBus />;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container}>
          <Provider store={store}>
            <Application location={location} />
          </Provider>
        </SafeAreaView>
      </QueryClientProvider>
      <StatusBar barStyle={"light-content"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
