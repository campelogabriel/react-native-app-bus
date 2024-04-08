import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
  Switch,
} from "react-native";
import { useSelector } from "react-redux";
import getStreet from "src/utils/getStreetsName";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Modal from "../components/Modal";
import { useLines } from "src/redux/sliceLines/sliceLines";
import MapChoose from "../components/MapChoose";
import ScrollOnibus from "src/components/ScrollOnibus";
import { useBuses } from "src/redux/sliceBuses/sliceBuses";
import { Bus } from "src/types/BusType";

const Page = ({ data }) => {
  const [street, setStreet] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const lines = useSelector(useLines);

  console.log("BusScreen rendered");

  //PEGAR ONIBUS NO REDUX
  const buses = [...useSelector(useBuses)].sort(
    (a, b) => a.distanciaKm - b.distanciaKm
  );

  // const buses = [
  //   {
  //     ordem: "A48054",
  //     linha: "539",
  //     latitude: "-22,99864",
  //     longitude: "-43,2576",
  //     distanciaKm: "1.70",
  //     velocidade: "50",
  //     datahora: "1712370378000",
  //     backgroundColor: "FCC417",
  //     textColor: "000000",
  //     trajeto: "Rocinha - Leme",
  //   },
  //   {
  //     ordem: "A48078",
  //     linha: "539",
  //     latitude: "-22,98435",
  //     longitude: "-43,24434",
  //     distanciaKm: "0.63",
  //     velocidade: "29",
  //     datahora: "1712370378000",
  //     backgroundColor: "FCC417",
  //     textColor: "000000",
  //     trajeto: "Rocinha - Leme",
  //   },
  //   {
  //     ordem: "A48078",
  //     linha: "539",
  //     latitude: "-22,98434",
  //     longitude: "-43,24465",
  //     distanciaKm: "0.64",
  //     velocidade: "31",
  //     datahora: "1712370378000",
  //     backgroundColor: "FCC417",
  //     textColor: "000000",
  //     trajeto: "Rocinha - Leme",
  //   },
  //   {
  //     ordem: "A48054",
  //     linha: "539",
  //     latitude: "-22,9984",
  //     longitude: "-43,25637",
  //     distanciaKm: "1.58",
  //     velocidade: "27",
  //     datahora: "1712370378000",
  //     backgroundColor: "FCC417",
  //     textColor: "000000",
  //     trajeto: "Rocinha - Leme",
  //   },
  //   {
  //     ordem: "A48078",
  //     linha: "539",
  //     latitude: "-22,98439",
  //     longitude: "-43,24525",
  //     distanciaKm: "0.64",
  //     velocidade: "12",
  //     datahora: "1712370378000",
  //     backgroundColor: "FCC417",
  //     textColor: "000000",
  //     trajeto: "Rocinha - Leme",
  //   },
  //   {
  //     ordem: "A48009",
  //     linha: "539",
  //     latitude: "-22,9397",
  //     longitude: "-43,20243",
  //     distanciaKm: "7.03",
  //     velocidade: "48",
  //     datahora: "1712370378000",
  //     backgroundColor: "FCC417",
  //     textColor: "000000",
  //     trajeto: "Rocinha - Leme",
  //   },
  //   {
  //     ordem: "A48009",
  //     linha: "539",
  //     latitude: "-22,93918",
  //     longitude: "-43,20263",
  //     distanciaKm: "7.06",
  //     velocidade: "57",
  //     datahora: "1712370378000",
  //     backgroundColor: "FCC417",
  //     textColor: "000000",
  //     trajeto: "Rocinha - Leme",
  //   },
  //   {
  //     ordem: "A48018",
  //     linha: "539",
  //     latitude: "-22,95807",
  //     longitude: "-43,20438",
  //     distanciaKm: "5.39",
  //     velocidade: "50",
  //     datahora: "1712370378000",
  //     backgroundColor: "FCC417",
  //     textColor: "000000",
  //     trajeto: "Rocinha - Leme",
  //   },
  //   {
  //     ordem: "A48078",
  //     linha: "539",
  //     latitude: "-22,98453",
  //     longitude: "-43,24523",
  //     distanciaKm: "0.63",
  //     velocidade: "12",
  //     datahora: "1712370378000",
  //     backgroundColor: "FCC417",
  //     textColor: "000000",
  //     trajeto: "Rocinha - Leme",
  //   },
  // ];

  useEffect(() => {
    getStreet(data.location).then((data) => {
      setStreet(data.results[0].formatted_address);
    });
  }, []);
  return (
    <>
      {modalVisible && (
        <View>
          <Modal modalVisible={modalVisible}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(52, 52, 52, 0.7)",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffffed",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 8,
                  paddingHorizontal: 12,
                  position: "absolute",
                  top: 20,
                  right: 20,
                  width: "100%",
                  // borderRadius: 12,
                }}
              >
                <Text style={{ color: "#222", fontSize: 16 }}>
                  Escolha uma Localização
                </Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <AntDesign
                    style={styles.closeBtn}
                    name="closesquare"
                    size={32}
                    color="#ff1100dd"
                  />
                </Pressable>
              </View>
              <MapChoose />
            </View>
          </Modal>
        </View>
      )}
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
            backgroundColor: "#026088dd",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#ddd",
              fontWeight: "bold",
            }}
          >
            Linhas de Onibus
          </Text>
        </View>
        <View style={styles.containerBtn}>
          {lines.length > 0 && (
            <ScrollView
              horizontal
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                marginTop: 16,
                alignItems: "center",
                marginLeft: 8,
              }}
            >
              {lines.map((line, i) => (
                <TouchableOpacity key={i} style={styles.lineBtn}>
                  <Text
                    style={{
                      color: "#eee",
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: 12,
                    }}
                  >
                    {line}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        {/* LOCALIZAÇÃO STATUS */}
        <View style={styles.localContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.localTouchable}
          >
            <View>
              <View style={{ gap: 12, alignItems: "center" }}>
                <Text style={{ alignSelf: "flex-start", color: "#5c5b5b" }}>
                  Localização Escolhida
                </Text>
                {street ? (
                  <Text
                    style={{
                      color: "#333",
                      fontStyle: "italic",
                      fontWeight: "bold",
                      fontSize: 12,
                      alignSelf: "flex-start",
                    }}
                  >
                    {street}
                  </Text>
                ) : (
                  <ActivityIndicator size="small" color="#026088dd" />
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#026088dd",
                  backgroundColor: "transparent",
                }}
              >
                Mudar Local
              </Text>
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <Text style={{ color: "#555" }}>
                  {buses.length} Ônibus No Radar
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.localBusStop}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 8,
              elevation: 3,
            }}
          >
            <MaterialCommunityIcons
              name="bus-stop-covered"
              size={26}
              color="#026088dd"
            />
            <Text
              style={{
                color: "#026088dd",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Ônibus Mais Próximo
            </Text>
          </View>
          <ScrollOnibus buses={buses} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    justifyContent: "flex-start",
  },
  containerBtn: {
    marginVertical: 20,
  },
  lineBtn: {
    width: 95,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#026088dd",
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  localContainer: {
    justifyContent: "flex-start",
    paddingTop: 20,
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  localTouchable: {
    width: "80%",
    gap: 40,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#222",
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  localBusStop: {
    flex: 3,
    alignItems: "center",
    gap: 15,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 60,
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
});

export default Page;
