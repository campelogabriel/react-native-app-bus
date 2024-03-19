import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotificationBusNext } from "src/redux/sliceSettings/sliceSettings";

import Modal from "../components/Modal";
import RemoveBus from "../components/RemoveBus";

const Page = ({ navigation }) => {
  const [isNotification, setIsNotification] = useState(true);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  function setNotification() {
    setIsNotification((not) => !not);
  }

  useEffect(() => {
    dispatch(setNotificationBusNext(isNotification));
  }, [isNotification]);

  return (
    <>
      {modal && (
        <View>
          <Modal modalVisible={modal}>
            <RemoveBus setModalVisible={setModal} />
          </Modal>
        </View>
      )}
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#ff6a00ba",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Configurações
            </Text>
          </View>
        </View>
        <View style={styles.blockSettings}>
          <TouchableOpacity style={styles.blockBtn}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <MaterialIcons
                style={{
                  backgroundColor: "#859bf8b8",
                  padding: 6,
                  borderRadius: 12,
                }}
                name="notifications"
                size={24}
                color="#2f0394b3"
              />
              <Text>Notificação</Text>
            </View>
            <View>
              <Switch
                value={isNotification}
                onValueChange={setIsNotification}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MapaStyle")}
            style={styles.blockBtn}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <MaterialIcons
                style={{
                  backgroundColor: "#fdbef8",
                  padding: 6,
                  borderRadius: 12,
                }}
                name="map"
                size={24}
                color="#ff00ea"
              />
              <Text>Mapa Estilo</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#777" />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModal(true)}
            style={styles.blockBtn}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <FontAwesome
                style={{
                  backgroundColor: "#52f8d7",
                  padding: 6,
                  borderRadius: 12,
                }}
                name="bus"
                size={24}
                color="#0e997d"
              />
              <Text>Remover Ônibus</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#777" />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockBtn}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Feather
                style={{
                  backgroundColor: "#eee",
                  padding: 6,
                  borderRadius: 12,
                }}
                name="help-circle"
                size={24}
                color="black"
              />

              <Text>Ajuda</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#777" />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
  },
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
    elevation: 3,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    padding: 16,
  },
});

export default Page;
