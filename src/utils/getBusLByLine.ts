async function getBusByLine(line: string[], location: number[]) {
  const res = await fetch(
    `https://getbuslines-t5sjbzcnqq-rj.a.run.app?line=${line.join(",")}&lat=${
      location[0]
    }&lng=${location[1]}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  // console.log("busesFromFunction", data.data.buses);
  return data;
}

export default getBusByLine;
