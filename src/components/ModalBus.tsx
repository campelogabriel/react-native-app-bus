import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
function Page({ setTabStyle, setModal, modalInfoBus, distanceFromMapView }) {
  // const now = Date.now();
  const now = Date.now();

  let diff = (now - modalInfoBus.datahora) / 1000; //seconds

  //time conversion
  let time;

  if (diff == 60) {
    time = `1 minuto atrás`;
  } else if (diff <= 30) {
    time = "Agora mesmo";
  } else if (diff >= 31 && diff <= 59) {
    time = `${Math.round(diff)} segundos atrás`;
  } else if (diff >= 3600) {
    time = `Mais de ${Math.round(diff / (60 * 60))} horas atrás`;
  } else {
    time = `${Math.round(diff / 60)} minutos atrás`;
  }

  //distance conversion
  let distance = distanceFromMapView;

  if (String(distance).startsWith("0")) {
    distance = `${String(distance).split(".").at(-1)} Metros`;
  } else {
    distance = `${Math.round(distance)} Kilometros`;
  }

  function handleModalBus() {
    setTabStyle(true);
    setModal(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ textTransform: "uppercase" }}>
          Numeração: {modalInfoBus.ordem}
        </Text>
        <Pressable onPress={handleModalBus}>
          <AntDesign
            style={styles.closeBtn}
            name="closesquare"
            size={32}
            color="#ff1100dd"
          />
        </Pressable>
      </View>
      <View
        style={{
          ...styles.tagInfo,
          borderBottomColor: `#${modalInfoBus.backgroundColor}`,
          borderBottomWidth: 3,
        }}
      >
        <View
          style={{
            ...styles.tag,
            backgroundColor: `#${modalInfoBus.backgroundColor}`,
          }}
        >
          <MaterialIcons
            name="directions-bus"
            size={20}
            color={`#${modalInfoBus.textColor}`}
          />
          <Text
            style={{ color: `#${modalInfoBus.textColor}`, fontWeight: "bold" }}
          >
            Linha {modalInfoBus.linha}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 9, alignItems: "center" }}>
          <Text>
            <FontAwesome5 name="directions" size={20} color="black" />
          </Text>
          <Text>Direção Atualizada</Text>
          <Text>
            {modalInfoBus.count > 1 ? (
              <AntDesign name="checkcircleo" size={20} color="green" />
            ) : (
              <AntDesign name="closecircleo" size={20} color="red" />
            )}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons name="highway" size={24} color="black" />
        <Text>Trajeto: {modalInfoBus.trajeto}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <MaterialCommunityIcons
          name="map-marker-distance"
          size={24}
          color="#420"
        />
        <Text>Distância por volta de {distance}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <MaterialIcons name="speed" size={24} color="black" />
        <Text>
          Velocidade do Veículo Registrada:
          {modalInfoBus.velocidade == 0
            ? " Parado"
            : ` ${modalInfoBus.velocidade} km/h`}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <AntDesign name="clockcircleo" size={24} color="black" />
        <Text>Última Atualização: {time}</Text>
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
    gap: 20,
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
    // gap: 15,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 8,
    alignItems: "center",
  },
  tag: {
    width: "35%",
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 9,
    justifyContent: "center",
    paddingVertical: 4,
    borderRadius: 4,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
});

export default Page;
