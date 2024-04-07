import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useBuses } from "src/redux/sliceBuses/sliceBuses";

function ScrollOnibus({ buses }) {
  if (buses.length == 0)
    return (
      <View style={styles.container}>
        <Text
          style={{
            backgroundColor: "#fff",
            padding: 32,
            borderRadius: 12,
            borderWidth: 1,
          }}
        >
          Sem Ônibus no Radar
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator
        scrollEnabled
        contentContainerStyle={{
          gap: 30,
          paddingBottom: 20,
          alignItems: "flex-end",
          justifyContent: "center",
          paddingHorizontal: 12,
        }}
      >
        {buses.map((bus, i) => (
          <TouchableOpacity
            style={{
              ...styles.btn,
              backgroundColor: `#${bus.backgroundColor}98`,
              borderColor: `#${bus.textColor}`,
            }}
            key={i}
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
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    // padding: 12,
    paddingHorizontal: 32,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 24,
    borderRadius: 16,
    borderWidth: 2,
  },
});

export default ScrollOnibus;
