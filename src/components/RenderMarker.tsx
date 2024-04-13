import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
function RenderMarker({ bus, navigation, onClickMarker }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onClickMarker(bus.ordem);
        navigation.navigate("Home");
      }}
      style={{
        ...styles.btn,
        backgroundColor: `#${bus.backgroundColor}98`,
      }}
    >
      <View style={{ alignItems: "center", alignSelf: "center" }}>
        <Text style={{ fontWeight: "bold" }}>{bus.linha}</Text>
        <Text style={{ fontWeight: "bold" }}>ORDEM: {bus.ordem}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Distancia</Text>
        <Text>{bus.distanciaKm} km</Text>
      </View>
    </TouchableOpacity>
  );
}

export default RenderMarker;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
  },
});
