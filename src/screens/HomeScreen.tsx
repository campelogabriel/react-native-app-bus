import { View, StyleSheet, Text } from "react-native";
import Header from "src/components/Header";
import MapCustom from "../components/MapCustom";
import { useSelector } from "react-redux";
import { useLines } from "src/redux/sliceLines/sliceLines";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBus } from "src/redux/sliceBuses/sliceBuses";
import { Bus } from "src/types/BusType";
import { useQuery } from "@tanstack/react-query";
import getBuses from "src/utils/getBuses";

// const buss = [
// {
//   backgroundColor: "FCC417",
//   count: 1,
//   datahora: "1712766137000",
//   distanciaKm: "NaN",
//   latitude: "-22,9893",
//   linha: "539",
//   longitude: "-43,25148",
//   ordem: "A48026",
//   textColor: "000000",
//   trajeto: "Rocinha - Leme",
//   velocidade: "0",
// },
// ];

const Page = ({ route }) => {
  const busLines = useSelector(useLines);
  const dispatch = useDispatch();

  const { data, fetchStatus, isPaused } = useQuery({
    refetchInterval: 1000 * 20,
    queryKey: ["buses"],
    queryFn: () => getBuses(busLines, route.params.data.location),
    enabled: busLines.length > 0,
    networkMode: "online",
    refetchOnReconnect: true,
  });

  if (data && !isPaused) {
    data?.data?.buses?.map((bus: Bus) => dispatch(addBus(bus)));
  }

  return (
    <View style={styles.container}>
      <Header status={fetchStatus} value={data?.data?.buses.length} />
      <MapCustom
        location={route.params.data.location}
        setTabStyle={route.params.data.setIsFlex}
      />
    </View>
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
