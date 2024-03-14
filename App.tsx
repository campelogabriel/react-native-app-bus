import { StyleSheet, StatusBar, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabNavigator from "./src/navigation/TabNavigator";
import { Provider } from "react-redux";
import store from "src/redux/store";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import LottieView from "lottie-react-native";
import { requestForegroundPermissionsAsync } from "expo-location";
import { createStackNavigator } from "@react-navigation/stack";
import BusScreen from "./src/screens/BusScreen";
import TestScreen from "src/screens/TestScreen";
import SettingsScreen from "src/screens/SettingsScreen";
import MapaStylesScreen from "src/screens/MapaStylesScreen";

// import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    AldotheApache: require("./assets/fonts/AldotheApache.ttf"),
  });
  const [isAllowed, setIsAllowed] = useState(false);

  const getPermission = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) setIsAllowed(true);
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (!fontsLoaded || !isAllowed)
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

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeInitial"
          >
            <Stack.Screen name="HomeInitial" component={TabNavigator} />
            <Stack.Screen name="BusInitial" component={BusScreen} />
            <Stack.Screen name="TestInitial" component={TestScreen} />
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
