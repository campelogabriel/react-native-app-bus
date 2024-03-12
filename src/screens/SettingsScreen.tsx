import {
  Button,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dimensions } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setDarkMode,
  setNotificationBusNext,
} from "src/redux/sliceSettings/sliceSettings";

const Page = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotification, setIsNotification] = useState(true);
  const dispatch = useDispatch();

  function setDarkModeStore() {
    setIsDarkMode((mode) => !mode);
  }
  function setNotification() {
    setIsNotification((not) => !not);
  }

  useEffect(() => {
    dispatch(setDarkMode(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    dispatch(setNotificationBusNext(isNotification));
  }, [isNotification]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#ff6a00ba",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Configurações
          </Text>
        </View>
      </View>
      <View style={styles.blockSettings}>
        <TouchableOpacity style={styles.blockBtn}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialIcons
              style={{
                backgroundColor: "#f88be061",
                padding: 6,
                borderRadius: 12,
              }}
              name="dark-mode"
              size={24}
              color="#d103a4"
            />
            <Text>Dark Mode</Text>
          </View>
          <View>
            <Switch value={isDarkMode} onValueChange={setDarkModeStore} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blockBtn}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialIcons
              style={{
                backgroundColor: "#859bf8b8",
                padding: 6,
                borderRadius: 12,
              }}
              name="notifications"
              size={24}
              color="#2f0394b3"
            />
            <Text>Notificação</Text>
          </View>
          <View>
            <Switch value={isNotification} onValueChange={setIsNotification} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MapaStyle")}
          style={styles.blockBtn}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialIcons
              style={{
                backgroundColor: "#00ffcc",
                padding: 6,
                borderRadius: 12,
              }}
              name="map"
              size={24}
              color="#0e997d"
            />
            <Text>Mapa Estilo</Text>
          </View>
          <View>
            <Text>
              <SimpleLineIcons name="arrow-right" size={14} color="#777" />
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blockBtn}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialCommunityIcons
              style={{
                backgroundColor: "#fc9a9a",
                padding: 6,
                borderRadius: 12,
              }}
              name="map-marker-distance"
              size={24}
              color="#ff0000"
            />
            <Text>Distanciamento dos Veiculos</Text>
          </View>
          <View>
            <Text>
              <SimpleLineIcons name="arrow-right" size={14} color="#777" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
  },
  blockSettings: {
    padding: 20,
    marginHorizontal: 20,
    // borderBottomRightRadius: 40,
    // borderBottomLeftRadius: 40,
    // borderRadius: 30,
    gap: 20,
    flex: 4,
    marginBottom: Dimensions.get("window").height * 0.205,
  },
  blockBtn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 3,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    padding: 16,
  },
});

export default Page;
