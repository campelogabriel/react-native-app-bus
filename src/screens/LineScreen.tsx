import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
function LineScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Linhas/Ônibus</Text>
      </View>
      <View
        style={{
          marginTop: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            backgroundColor: "#fff",
            padding: 8,
            borderRadius: 8,
            elevation: 2,
            borderWidth: 1,
            borderColor: "#ccc",
            color: "#555",
            fontWeight: "bold",
          }}
        >
          Linhas Selecionadas
        </Text>

        <View style={styles.lineContainer}>
          <Text style={styles.lines}>539</Text>
          <Text style={styles.lines}>539</Text>
          <Text style={styles.lines}>539</Text>
          <Text style={styles.lines}>539</Text>
          <Text style={styles.lines}>539</Text>
          <Text style={styles.lines}>539</Text>
          <Text style={styles.lines}>539</Text>
          <Text style={styles.lines}>539</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                backgroundColor: "#fff",
                borderRadius: 4,
                padding: 12,
                fontWeight: "500",
                textAlign: "center",
                borderWidth: 1,
                borderColor: "#aaa",
              }}
            >
              Remover Linhas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                backgroundColor: "#fff",
                borderRadius: 4,
                padding: 12,
                fontWeight: "500",
                textAlign: "center",
                borderWidth: 1,
                borderColor: "#aaa",
              }}
            >
              Remover Ônibus
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LineScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#facb33",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    justifyContent: "center",
    gap: 12,
  },
  lines: {
    borderRadius: 9,
    elevation: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fac30e",
    padding: 8,
    backgroundColor: "#fff",
  },
});
