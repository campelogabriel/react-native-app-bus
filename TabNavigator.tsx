import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./src/screens/SettingsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import BusScreen from "./src/screens/BusScreen";
import CustomTabBar from "./src/CustomTabBar/CustomTabBar";

const Tab = createBottomTabNavigator();

const Routes = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        borderTopWidth: 0,
        backgroundColor: "#ffff",
      },
    }}
    tabBar={(props) => <CustomTabBar {...props} />}
  >
    <Tab.Screen name="Bus" component={BusScreen} />
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Settings-outline" component={SettingsScreen} />
  </Tab.Navigator>
);

export default Routes;
