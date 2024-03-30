import { View, StyleSheet } from "react-native";
import Header from "src/components/Header";
import MapCustom from "../components/MapCustom";
import { useSelector } from "react-redux";
import { useLines } from "src/redux/sliceLines/sliceLines";
import { useEffect } from "react";
import getBusByLine from "src/utils/getBusLByLine";
import { useDispatch } from "react-redux";
import { addBus } from "src/redux/sliceBuses/sliceBuses";

const Page = ({ data }) => {
  const busLines = useSelector(useLines);
  const dispatch = useDispatch();

  if (!data.location) return;

  // useEffect(() => {
  //   const getttingBus = async () => {
  //     console.log("Linhas ", busLines);
  //     console.log("Location  ", data.location);
  //     try {
  //       const res = await getBusByLine(busLines, data.location);
  //       const dataBus = await res.data.buses;
  //       dataBus.map((bus) => dispatch(addBus(bus)));
  //     } catch (err) {
  //       console.log("erro", err);
  //     }
  //   };
  //   getttingBus();
  // }, []);

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
