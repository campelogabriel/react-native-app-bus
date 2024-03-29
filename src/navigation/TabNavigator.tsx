import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import BusScreen from "../screens/BusScreen";
import CustomTabBar from "../components/CustomTabBar/CustomTabBar";
import { useState } from "react";

const Tab = createBottomTabNavigator();

const Routes = () => {
  const [isFlex, setIsFlex] = useState(true);

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
      <Tab.Screen name="Bus" component={BusScreen} />
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen data={{ isFlex, setIsFlex }} />}
        // component={HomeScreen}
      />
      <Tab.Screen name="Settings-outline" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default Routes;
