import { useEffect, useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { createStackNavigator } from "@react-navigation/stack";

import store from "src/redux/store";

import TabNavigator from "./src/navigation/TabNavigator";
import BusScreen from "./src/screens/BusScreen";
import SettingsScreen from "src/screens/SettingsScreen";
import MapaStylesScreen from "src/screens/MapaStylesScreen";
import NotAllowed from "src/components/NotAllowed";
import NoLocal from "src/components/NoLocal";
import LottieViewBus from "src/components/LottieViewBus";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
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
  7;

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container}>
          <Provider store={store}>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="HomeInitial"
            >
              <Stack.Screen
                name="HomeInitial"
                initialParams={{
                  location: location,
                }}
                component={TabNavigator}
              />
              <Stack.Screen name="BusInitial" component={BusScreen} />
              <Stack.Screen name="MapaStyle" component={MapaStylesScreen} />
              <Stack.Screen
                name="Settings-outlineInitial"
                component={SettingsScreen}
              />
            </Stack.Navigator>
          </Provider>
        </SafeAreaView>
      </QueryClientProvider>
      <StatusBar barStyle={"light-content"} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
