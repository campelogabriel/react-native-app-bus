import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { removeLines, useLines } from "src/redux/sliceLines/sliceLines";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
function Page({ setModalVisible }) {
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  const lines = useSelector(useLines);
  const dispatch = useDispatch();

  const nextPage = () => {
    if (page * offset >= lines.length) return;
    setOffset((offset) => offset + 4);
    setPage((page) => page + 1);
  };
  const backPage = () => {
    if (page <= 1) return;
    setOffset((offset) => offset - 4);
    setPage((page) => page - 1);
  };

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
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            paddingBottom: 8,
          }}
        >
          <Text style={{ fontSize: 16, color: "#222" }}>
            Remova o Ônibus da Lista
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
        {lines.slice(offset, 4 * page).map((line: string, i: number) => (
          <TouchableOpacity key={i}>
            <View
              style={{
                backgroundColor: "#f8f8f8",
                padding: 8,
                borderWidth: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{line}</Text>
              <Pressable
                onPress={() => {
                  dispatch(removeLines(line));
                }}
              >
                <AntDesign
                  style={styles.closeBtn}
                  name="closesquare"
                  size={24}
                  color="#7ed6ffdd"
                />
              </Pressable>
            </View>
          </TouchableOpacity>
        ))}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <AntDesign
              onPress={() => backPage()}
              name="caretleft"
              size={24}
              color="#333"
            />
            <AntDesign
              onPress={() => nextPage()}
              name="caretright"
              size={24}
              color="#333"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});

export default Page;
