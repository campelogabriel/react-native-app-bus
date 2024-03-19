import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const DISTANCE = ["20 Km", "50 Km", "80 Km", "120 Km", "200 Km"];

function Page({ setModalVisible }) {
  const [distance, setDistance] = useState("200 Km");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(52, 52, 52, 0.7)",
        padding: 20,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#ccc",
            paddingBottom: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#222",
            }}
          >
            Escolha o alcance dos Onibus
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
        <Picker
          style={{ backgroundColor: "#eee", color: "#222", elevation: 2 }}
          onValueChange={(item) => setDistance(item)}
          selectedValue={distance}
        >
          {DISTANCE.map((distancia, i) => (
            <Picker.Item
              style={
                Platform.OS == "ios" ? styles.inputIOS : styles.inputAndroid
              }
              key={i}
              label={distancia}
              value={distancia}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    gap: 40,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
  },
});

export default Page;
