import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { usePositions } from "src/redux/slicePositions/slicePositions";
import getStreet from "src/utils/getStreetsName";

const data = ["538", "379", "539", "309", "112", "247", "SVB2345", "465"];

const Page = () => {
  const [street, setStreet] = useState<string>("");
  const position = useSelector(usePositions);

  useEffect(() => {
    getStreet(position).then((data) => {
      console.log("updated");
      setStreet(data.results[0].formatted_address);
    });
  }, []);

  return (
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
            marginTop: 16,
            marginHorizontal: 10,
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
        <TouchableOpacity style={styles.localTouchable}>
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
                {street || <ActivityIndicator size="small" color="#026088dd" />}
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
            <Text style={{ color: "#555" }}>8 veiculos por perto</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
});

export default Page;
