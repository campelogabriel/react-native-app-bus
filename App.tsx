import { StyleSheet, StatusBar, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabNavigator from "./src/navigation/TabNavigator";
import { Provider } from "react-redux";
import store from "src/redux/store";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import LottieView from "lottie-react-native";
import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { createStackNavigator } from "@react-navigation/stack";
import BusScreen from "./src/screens/BusScreen";
import SettingsScreen from "src/screens/SettingsScreen";
import MapaStylesScreen from "src/screens/MapaStylesScreen";

import getLocalStorage from "./src/utils/getDataLocalStorage";
import { UserStorageType } from "src/types/UserStorageType";

const Stack = createStackNavigator();

export default function App() {
  const [isPermissionLocation, setIsPermissionLocation] = useState(false);
  const [location, setLocation] = useState<LocationObject>();
  const [userLocalStorage, setUserLocalStorage] = useState<any>();

  async function requestLocationPermissions() {
    const positions = await getCurrentPositionAsync();
    setLocation(positions);
  }

  console.log("app screen");

  const getPermissionLocation = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      setIsPermissionLocation(true);
      requestLocationPermissions();
    }
  };

  useEffect(() => {
    getPermissionLocation();
    getLocalStorage().then((store) => {
      setUserLocalStorage(store);
    });
  }, []);

  if (!isPermissionLocation || !location || !userLocalStorage)
    return (
      <View style={styles.splash}>
        <LottieView
          style={{ flex: 1 }}
          source={require("./assets/buscarioca.json")}
          resizeMode="cover"
          autoPlay
          loop
        />
      </View>
    );
  7;

  return (
    <NavigationContainer>
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
                localStorage: userLocalStorage,
              }}
              component={TabNavigator}
            />
            <Stack.Screen
              name="BusInitial"
              children={() => <BusScreen data={{ location: location }} />}
            />
            <Stack.Screen name="MapaStyle" component={MapaStylesScreen} />
            <Stack.Screen
              name="Settings-outlineInitial"
              component={SettingsScreen}
            />
          </Stack.Navigator>
        </Provider>
      </SafeAreaView>
      <StatusBar barStyle={"light-content"} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  splash: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});
