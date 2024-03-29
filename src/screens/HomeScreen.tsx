import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Header from "src/components/Header";
import { usePositions } from "src/redux/slicePositions/slicePositions";
import MapCustom from "../components/MapCustom";

const Page = ({ data }) => {
  if (!data.location) return;

  // getBusByLine(busLines, location).then((veiculos) => {
  //   veiculos.map((onibus) => dispatch(addBus(onibus)));
  // });

  return (
    <>
      <View style={styles.container}>
        <Header />
        <MapCustom setTabStyle={data.setIsFlex} location={data.location} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
