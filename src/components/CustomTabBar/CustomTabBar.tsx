import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

function activeColor(nameIcon: string): string {
  if (nameIcon.toLowerCase() === "bus") {
    return "#026088dd";
  } else if (nameIcon.toLowerCase() === "home") {
    return "#0e997d";
  } else {
    return "#FF6B00";
  }
}

const Page = ({ state, descriptors, navigation }: any) => {
  const displayTabInHome =
    descriptors[Object.keys(descriptors)[1]].options.tabBarStyle.display;
  return (
    <View style={{ ...styles.container, display: displayTabInHome }}>
      <View style={styles.content}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: "center" }}
              key={index}
            >
              <View>
                <View>
                  <Ionicons
                    name={route.name.toLowerCase()}
                    size={25}
                    color={isFocused ? activeColor(route.name) : "#535353"}
                    style={{
                      backgroundColor: isFocused ? "#f0efef" : "#fff",
                      padding: 4,
                      borderRadius: 12,
                      justifyContent: "center",
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    marginBottom: Dimensions.get("window").height * 0.05,
    // marginBottom: Platform.OS === "ios" ? 38 : 24,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffffff",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 100,
    gap: 34,
    elevation: 4,
    shadowColor: "#777",
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});

export default Page;
