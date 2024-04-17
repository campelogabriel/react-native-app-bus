import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
function AlcanceRadar() {
  const [choose, setChoose] = useState("TOTAL");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.text}>X CANCELAR</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>X OK</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.radar}>
        <Text style={styles.textChoose}>Alcance do Radar: {choose}</Text>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 16,
            gap: 16,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 1, gap: 16 }}>
            <TouchableOpacity
              style={styles.distance}
              onPress={() => setChoose("200 METROS")}
            >
              <Text style={styles.textDistance}>200 METROS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChoose("400 METROS")}
              style={{ ...styles.distance, backgroundColor: "#20a" }}
            >
              <Text style={styles.textDistance}>400 metros</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChoose("600 METROS")}
              style={styles.distance}
            >
              <Text style={styles.textDistance}>600 metros</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, gap: 16 }}>
            <TouchableOpacity
              onPress={() => setChoose("1 KM")}
              style={{ ...styles.distance, backgroundColor: "#20a" }}
            >
              <Text style={styles.textDistance}>1 km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChoose("3 KM")}
              style={styles.distance}
            >
              <Text style={styles.textDistance}>3 km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChoose("TOTAL")}
              style={{ ...styles.distance, backgroundColor: "#20a" }}
            >
              <Text style={styles.textDistance}>TOTAL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AlcanceRadar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#899df8",
    borderBottomWidth: 2,
    borderBottomColor: "#20a",
    padding: 30,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#20a",
  },
  textChoose: {
    backgroundColor: "#fff",
    color: "#20a",
    fontWeight: "bold",
    padding: 8,
    alignSelf: "center",
    elevation: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  radar: {
    backgroundColor: "#5271fa88",
    padding: 15,
  },
  radarAlcance: {
    gap: 30,
    marginTop: 16,
    alignItems: "center",
  },
  distance: {
    backgroundColor: "#5932f7",
    padding: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textDistance: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
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
    backgroundColor: "#20a",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
});
