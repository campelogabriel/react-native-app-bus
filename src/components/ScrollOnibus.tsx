import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { addMarker } from "src/redux/sliceMarker/sliceMarker";
import { Bus } from "src/types/BusType";

function ScrollOnibus({ buses, navigation }) {
  const dispatch = useDispatch();

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
        indicatorStyle="black"
        contentContainerStyle={{
          gap: 30,
          paddingBottom: 20,
          alignItems: "flex-end",
          justifyContent: "center",
          paddingHorizontal: 12,
        }}
      >
        {buses.map((bus: Bus) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(addMarker(bus.ordem));
              navigation.navigate("Home");
            }}
            style={{
              ...styles.btn,
              backgroundColor: `#${bus.backgroundColor}98`,
            }}
            key={bus.ordem}
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
    borderColor: "#000",
  },
});

export default ScrollOnibus;
