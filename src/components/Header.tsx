import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addLines } from "src/redux/sliceLines/sliceLines";
import { useFonts } from "expo-font";

function Header() {
  const [line, setLine] = useState<string>("");
  const dispacth = useDispatch();

  function handleSubmit() {
    dispacth(addLines(line));
    setLine("");
  }

  return (
    <View style={styles.header}>
      {/* <MaterialIcons name="123" size={34} color="#0e997d" /> */}
      <Text style={styles.ex}>123ABC</Text>
      <TextInput
        // autoComplete=""
        autoCapitalize={"characters"}
        textAlign="center"
        placeholder="Digite a linha..."
        maxLength={7}
        value={line}
        onChangeText={(text) => setLine(text)}
        style={{
          color: "#0e997d",
          textDecorationLine: "none",
        }}
        onSubmitEditing={handleSubmit}
      />
      <EvilIcons name="search" size={30} color="#777" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    paddingHorizontal: 30,
    zIndex: 9,
    paddingVertical: 10,
    position: "absolute",
    top: 20,
    alignItems: "center",
    gap: 30,
    alignSelf: "center",
    elevation: 55,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  textInput: {
    fontFamily: "AldotheApache",
  },
  ex: {
    color: "#0e997d",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default Header;
