import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addLines } from "src/redux/sliceLines/sliceLines";
import { useFonts } from "expo-font";
import AnimatedBusUpdated from "./AnimatedBusUpdated";

function Header({ value }) {
  const [line, setLine] = useState<string>("");
  const dispacth = useDispatch();

  function handleSubmit() {
    dispacth(addLines(line));
    setLine("");
  }

  return (
    <View style={styles.container}>
      {/* <MaterialIcons name="123" size={34} color="#0e997d" /> */}
      <View style={styles.header}>
        <Text style={styles.ex}>123ABC</Text>
        <TextInput
          // autoComplete=""
          autoCapitalize={"characters"}
          textAlign="center"
          placeholder="Digite a linha..."
          maxLength={13}
          value={line}
          onChangeText={(text) => setLine(text)}
          style={{
            color: "#0e997d",
            textDecorationLine: "none",
          }}
          onSubmitEditing={handleSubmit}
        />
        <EvilIcons
          name="search"
          size={30}
          color="#777"
          onPress={handleSubmit}
        />
      </View>
      <AnimatedBusUpdated bus={value} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    zIndex: 9,
    position: "absolute",
    top: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#ffff",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",

    // alignSelf: "center",
    elevation: 55,
    gap: 30,

    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
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
