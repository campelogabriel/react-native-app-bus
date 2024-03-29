import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState } from "react";

function Page({ setTabStyle, setModal }) {
  function handleModalBus() {
    setTabStyle(true);
    setModal(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ textTransform: "uppercase" }}>Numeração: AF20102</Text>
        <Pressable onPress={handleModalBus}>
          <AntDesign
            style={styles.closeBtn}
            name="closesquare"
            size={32}
            color="#ff1100dd"
          />
        </Pressable>
      </View>
      <View style={styles.tagInfo}>
        <View style={styles.tag}>
          <MaterialIcons name="directions-bus" size={20} color="#000" />
          <Text style={{ color: "#000" }}>Linha 538</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <MaterialCommunityIcons name="highway" size={20} color="black" />
          <Text>Trajeto: Rocinha - Leme</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <MaterialCommunityIcons
          name="map-marker-distance"
          size={24}
          color="#420"
        />
        <Text>Distancia de 620 metros...</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <MaterialIcons name="speed" size={24} color="black" />
        <Text>Velocidade do Veículo Registrada: 20 Km/h</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <AntDesign name="clockcircleo" size={20} color="black" />
        <Text>Última Atualização: 32 segundos atrás...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    gap: 25,
    position: "absolute",
    elevation: 3,
    padding: 16,
    bottom: 0,
    left: 0,
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
    zIndex: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#eee",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },

  tagInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderColor: "#eee",
    // paddingBottom: 8,
  },
  tag: {
    backgroundColor: "#FCC417",
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
});

export default Page;
