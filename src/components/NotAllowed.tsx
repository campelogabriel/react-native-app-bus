import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
function NotAllowed({ getPermissionLocation }) {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.containerNotAllowed}>
        <Text style={styles.headerNotAllowed}>
          Para o funcionamento do aplicativo, é necessário a permissão do uso do
          Local.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={getPermissionLocation}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            Permitir uso
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default NotAllowed;

const styles = StyleSheet.create({
  containerNotAllowed: {
    backgroundColor: "#2c9058",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headerNotAllowed: {
    textAlign: "center",
    fontSize: 24,
    color: "#FFED00",
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 2,
      height: 4,
    },
  },
  btn: {
    backgroundColor: "#eee",
    padding: 8,
    marginTop: 20,
    elevation: 6,
    borderWidth: 1,
  },
});
