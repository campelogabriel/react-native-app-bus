import {
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setMapStyles,
  useSettings,
} from "src/redux/sliceSettings/sliceSettings";
import { useSelector } from "react-redux";

function Page({ navigation }) {
  const [choosed, setChoosed] = useState("");
  const dispatch = useDispatch();
  const settings = useSelector(useSettings);

  useLayoutEffect(() => {
    setChoosed(settings.mapStyles);
  }, []);

  useEffect(() => {
    dispatch(setMapStyles(choosed));
  }, [choosed]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.header}>Aparencia do Mapa</Text>
      </View>
      <View style={styles.mapChoose}>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => setChoosed("padrao")}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <FontAwesome name="map-signs" size={26} color="black" />
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>Padrão</Text>
          </View>
          <TouchableOpacity
            style={styles.outter}
            onPress={() => setChoosed("padrao")}
          >
            {choosed == "padrao" && <View style={styles.inner}></View>}
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => setChoosed("retro")}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <FontAwesome name="camera-retro" size={26} color="#005a48" />
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>Retro</Text>
          </View>
          <TouchableOpacity
            style={styles.outter}
            onPress={() => setChoosed("retro")}
          >
            {choosed == "retro" && <View style={styles.inner}></View>}
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => setChoosed("night")}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <MaterialCommunityIcons
              name="weather-night"
              size={26}
              color="#002c8b"
            />
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>Night</Text>
          </View>
          <TouchableOpacity
            style={styles.outter}
            onPress={() => setChoosed("night")}
          >
            {choosed == "night" && <View style={styles.inner}></View>}
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => setChoosed("silver")}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <FontAwesome name="map" size={26} color="#ccc" />
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>Silver</Text>
          </View>
          <TouchableOpacity
            style={styles.outter}
            onPress={() => setChoosed("silver")}
          >
            {choosed == "silver" && <View style={styles.inner}></View>}
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.blockButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontSize: 14,
              padding: 9,
              textAlign: "center",
              borderRadius: 8,
              textTransform: "uppercase",
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            Retornar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text
            style={{
              backgroundColor: "#ff6a00ba",
              color: "#fff",
              fontSize: 14,
              padding: 9,
              textAlign: "center",
              borderRadius: 8,
              textTransform: "uppercase",
              fontWeight: "bold",
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            Concluir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    gap: 20,
  },
  header: {
    fontSize: 26,
    color: "#ff6a00ba",
    fontWeight: "bold",
    justifyContent: "center",
  },
  mapChoose: { gap: 40, flex: 4, justifyContent: "flex-start" },

  mapBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    color: "#fff",
    elevation: 2,
  },

  blockButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 26,
    flex: 2,
  },
  outter: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 11,
    height: 11,
    backgroundColor: "#ff6a00ba",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
