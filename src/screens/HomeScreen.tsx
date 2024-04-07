import { View, StyleSheet } from "react-native";
import Header from "src/components/Header";
import MapCustom from "../components/MapCustom";
import { useSelector } from "react-redux";
import { useLines } from "src/redux/sliceLines/sliceLines";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBus } from "src/redux/sliceBuses/sliceBuses";
import { addPosition } from "src/redux/slicePositions/slicePositions";
import { Bus } from "src/types/BusType";

const Page = ({ data }) => {
  const [busesRendered, setbusesRendered] = useState(0);
  const busLines = useSelector(useLines);
  const dispatch = useDispatch();

  console.log("HomeScreen rendered");

  useEffect(() => {
    dispatch(addPosition(data.location));
    //add settings from user local storage

    if (busLines.length == 0) return;

    const busLinesString = busLines.join(",").trim();

    fetch(
      `${process.env.EXPO_PUBLIC_API_BUS_LINES_URL}?line=${busLinesString}&lat=${data.location[0]}&lng=${data.location[1]}`
    )
      .then((res) => res.json())
      .then((data) => {
        setbusesRendered(data.data.buses.length);
        data.data.buses.map((bus: Bus) => dispatch(addBus(bus)));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (busLines.length == 0) return;

    const busLinesString = busLines.join(",").trim();

    const gettingBuses = setInterval(() => {
      fetch(
        `${process.env.EXPO_PUBLIC_API_BUS_LINES_URL}?line=${busLinesString}&lat=${data.location[0]}&lng=${data.location[1]}`
      )
        .then((res) => res.json())
        .then((data) => {
          setbusesRendered(data.data.buses.length);
          data.data.buses.map((bus) => dispatch(addBus(bus)));
        })
        .catch((err) => console.log(err));
    }, 20000);
  }, [busLines]);

  if (!data.location) return;

  return (
    <>
      <View style={styles.container}>
        <Header value={busesRendered} />
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
