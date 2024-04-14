import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addLines } from "src/redux/sliceLines/sliceLines";
import AnimatedBusUpdated from "./AnimatedBusUpdated";
import NoConexion from "./NoConexion";
import AnimatedBusUpdating from "./AnimatedBusUpdating";
import { useIsFetching } from "@tanstack/react-query";

function Header({ value = 0, status }) {
  const [line, setLine] = useState<string>("");
  const isFetching = useIsFetching();
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(addLines(line));
    setLine("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.ex}>123ABC</Text>
        <TextInput
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
      {status == "paused" && <NoConexion />}
      {isFetching ? (
        <AnimatedBusUpdating />
      ) : (
        <AnimatedBusUpdated bus={value} />
      )}
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
    gap: 8,
  },
  header: {
    width: "100%",
    backgroundColor: "#ffff",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",
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
