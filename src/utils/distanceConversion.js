export default function (distance) {
  if (String(distance).startsWith("0")) {
    distance = `${String(distance).split(".").at(-1)} metros`;
  } else if (String(distance).startsWith("1.")) {
    distance = `${Math.round(distance)} Km`;
  } else {
    distance = `${Math.round(distance)} Km`;
  }
  return distance;
}
