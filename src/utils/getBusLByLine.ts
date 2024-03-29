import { LocationObject } from "expo-location";

async function getBusByLine(line: string[], location: number[]) {
  const res = await fetch(
    `http://locahost:5001/app-bus-5d8c8/southamerica-east1/getBusLines?line=${line.join(
      ","
    )}&lat=${location[0]}&lng=${location[1]}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = await res.json();
  console.log("d", data);

  //transform in objects

  // let dataBus = data.data.buses;
  return data;
}

export default getBusByLine;
