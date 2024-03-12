import { StyleSheet, Text, View } from "react-native";

function TestScreen() {
  return (
    <View style={styles.container}>
      <Text>Teste Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TestScreen;
