import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import getStreet from "src/utils/getStreetsName";
import { MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";
import ScrollOnibus from "src/components/ScrollOnibus";
import { useBuses } from "src/redux/sliceBuses/sliceBuses";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const Page = ({ route }) => {
  const [street, setStreet] = useState<string>("");
  console.log("BusScreen rendered");

  useEffect(() => {
    getStreet(route.params.data.location).then((data) => {
      setStreet(data.results[0].formatted_address);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.localHeader}>Veículos</Text>
      </View>
      <View style={styles.localContainer}>
        <View style={styles.localTouchable}>
          <View>
            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 9,
                  justifyContent: "flex-start",
                }}
              >
                <Text>Localização Atual</Text>
                <FontAwesome6
                  name="tower-broadcast"
                  size={16}
                  color="#0279acdd"
                />
              </View>

              {street ? (
                <Text style={styles.address}>{street}</Text>
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
          ></View>
        </View>
      </View>
      <View style={styles.localBusStop}>
        <View style={styles.headerBusStop}>
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
        <ScrollOnibus />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#026088dd",
  },

  localContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 12,
    alignItems: "center",
    flex: 1,
  },
  localHeader: {
    fontSize: 16,
    color: "#ddd",
    fontWeight: "bold",
  },
  address: {
    color: "#555",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 16,
  },
  localTouchable: {
    gap: 14,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 5,
  },
  localBusStop: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: Dimensions.get("window").height * 0.12,
  },
  headerBusStop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    elevation: 5,
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
});

export default Page;
