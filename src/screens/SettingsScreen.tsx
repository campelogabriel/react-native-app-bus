import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";
import {
  SimpleLineIcons,
  FontAwesome5,
  Feather,
  Ionicons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAutomatedFetch,
  useSettings,
} from "../../src/redux/sliceSettings/sliceSettings";
import CustomTabBar from "../../src/components/CustomTabBar/CustomTabBar";
import { useRoute } from "@react-navigation/native";
import { useLines } from "../../src/redux/sliceLines/sliceLines";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const settigns = useSelector(useSettings);
  const lines = useSelector(useLines);
  const [modal, setModal] = useState(false);
  const [enabledAuto, setEnableAuto] = useState<boolean>(
    settigns.isEnabledAutomate
  );

  const route = useRoute();

  console.log("Settings Screen");

  function handleAutomatedFetch() {
    setEnableAuto((v) => {
      return !v;
    });
    dispatch(setAutomatedFetch(!enabledAuto));
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Configurações</Text>
          </View>
        </View>
        <View style={styles.blockSettings}>
          <TouchableOpacity
            onPress={handleAutomatedFetch}
            style={styles.blockBtn}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <FontAwesome5
                name="broadcast-tower"
                style={{
                  ...styles.icon,
                  backgroundColor: "#859bf8b8",
                }}
                size={20}
                color="#2f0394b3"
              />
              <Text>Busca Automática</Text>
            </View>
            <TouchableOpacity
              onPress={handleAutomatedFetch}
              style={{
                ...styles.outter,
                backgroundColor: enabledAuto ? "#859bf8b8" : "#aaa",
                justifyContent: enabledAuto ? "flex-end" : "flex-start",
              }}
            >
              <View style={styles.inner}></View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MapaStyle")}
            style={styles.blockBtn}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Entypo
                style={{ ...styles.icon, backgroundColor: "#46c7ffdd" }}
                name="map"
                size={24}
                color="#026088dd"
              />

              <Text>Estilo do Mapa</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#444" />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Lines")}
            style={styles.blockBtn}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <FontAwesome5
                style={{ ...styles.icon, backgroundColor: "#facc33dd" }}
                name="bus-alt"
                size={22}
                color="#111"
              />

              <Text>Resetar Linhas</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#444" />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockBtn}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Feather
                style={{
                  ...styles.icon,
                  backgroundColor: "#e9e7e7",
                }}
                name="book-open"
                size={22}
                color="black"
              />
              <Text>Manual</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#444" />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockBtn}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <AntDesign
                style={{
                  padding: 6,
                  borderRadius: 8,
                  backgroundColor: "#222",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                name="infocirlceo"
                size={22}
                color="white"
              />

              <Text>Sobre</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#444" />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <CustomTabBar routeName={route.name} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fefefe",
  },
  header: {
    backgroundColor: "#ff6a00ba",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  blockSettings: {
    padding: 14,
    marginHorizontal: 20,
    gap: 20,
    flex: 4,
    marginBottom: Dimensions.get("window").height * 0.205,
  },
  blockBtn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 2,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  icon: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#59ffa4",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 20,
    height: 20,
    backgroundColor: "#f3f3f3",
    borderRadius: 15,
    borderWidth: 0.3,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  outter: {
    width: 40,
    height: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0.2,
  },
});

export default SettingsScreen;
