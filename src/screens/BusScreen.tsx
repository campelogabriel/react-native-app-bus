import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  // Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { usePositions } from "src/redux/slicePositions/slicePositions";
import getStreet from "src/utils/getStreetsName";
import Form from "../components/Form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "../components/Modal";

const data = ["538", "379", "538", "379", "538", "379", "538", "379"];

const Page = () => {
  const [street, setStreet] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const position = useSelector(usePositions);

  useEffect(() => {
    getStreet(position).then((data) => {
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
                backgroundColor: "rgba(52, 52, 52, 0.7)",
                padding: 20,
              }}
            >
              <Form setModalVisible={setModalVisible} />
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
            {data.map((line, i) => (
              <TouchableOpacity
                onPress={(e) => console.log(e.target)}
                key={i}
                style={styles.lineBtn}
              >
                <Text
                  style={{
                    color: "#eee",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {line}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
                <Text
                  style={{
                    color: "#333",
                    fontStyle: "italic",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {street || (
                    <ActivityIndicator size="small" color="#026088dd" />
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
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
                <Text style={{ color: "#555" }}>8 veiculos por perto</Text>
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
              Ponto de Ônibus Próximo
            </Text>
          </View>
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
    // position: "relative",
    width: 55,
    height: 55,
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
    flex: 2,
    alignItems: "center",
    padding: 20,
    marginHorizontal: 20,
  },
});

export default Page;
