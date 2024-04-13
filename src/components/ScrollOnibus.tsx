import { FlatList, Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useBuses } from "src/redux/sliceBuses/sliceBuses";
import { addMarker } from "src/redux/sliceMarker/sliceMarker";
import RenderMarker from "./RenderMarker";
import { useNavigation } from "@react-navigation/native";

function ScrollOnibus() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const buses = [...useSelector(useBuses)]
    .filter((bus) => bus.count > 1)
    .sort((a, b) => a.distanciaKm - b.distanciaKm);

  console.log("ScrollOnibus rendering");

  function onClickMarker(ordem: string) {
    dispatch(addMarker(ordem));
  }

  if (buses.length == 0)
    return (
      <Image
        style={{ width: 230, height: 240 }}
        source={require("../../assets/nobus.png")}
      />
    );

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews={true}
        contentContainerStyle={{
          width: "100%",
          flexGrow: 1,
          gap: 30,
          paddingBottom: 20,
          alignItems: "flex-end",
          justifyContent: "center",
          paddingHorizontal: 12,
        }}
        renderItem={({ item }) => (
          <RenderMarker
            bus={item}
            onClickMarker={onClickMarker}
            navigation={navigation}
          />
        )}
        data={buses}
        keyExtractor={(bus) => bus.ordem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
  },
});

export default ScrollOnibus;
