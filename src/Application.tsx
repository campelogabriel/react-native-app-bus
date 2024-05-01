import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./screens/SettingsScreen";
import LocalScreen from "./screens/LocalScreen";
import MapaStylesScreen from "./screens/MapaStylesScreen";
import PositionScreen from "./screens/PositionScreen";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPosition } from "./redux/slicePositions/slicePositions";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

function Application({ location }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addPosition([location.coords.latitude, location.coords.longitude])
    );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomeInitial"
      >
        <Stack.Screen name="HomeInitial" component={HomeScreen} />
        <Stack.Screen name="LocalInitial" component={LocalScreen} />
        <Stack.Screen name="MapaStyle" component={MapaStylesScreen} />
        <Stack.Screen
          name="Position"
          options={{
            title: "Mude a Localização",
            headerShown: true,
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#026088",
            },
          }}
          component={PositionScreen}
        />
        <Stack.Screen name="SettingsInitial" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Application;
