import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import BusScreen from "../screens/BusScreen";
import CustomTabBar from "../components/CustomTabBar/CustomTabBar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPosition } from "src/redux/slicePositions/slicePositions";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const [isFlex, setIsFlex] = useState(true);

  console.log("tabNavigator screen");

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#ffff",
          display: isFlex ? "flex" : "none",
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Bus"
        children={() => (
          <BusScreen
            data={{
              location: [
                route.params.location.coords.latitude,
                route.params.location.coords.longitude,
              ],
            }}
          />
        )}
      />
      <Tab.Screen
        name="Home"
        children={() => (
          <HomeScreen
            data={{
              isFlex,
              setIsFlex,
              location: [
                route.params.location.coords.latitude,
                route.params.location.coords.longitude,
              ],
              localStorage: route.params.localStorage,
            }}
          />
        )}
      />
      <Tab.Screen name="Settings-outline" children={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
