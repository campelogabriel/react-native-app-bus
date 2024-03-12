export default function DistanciaKm(lat1, lat2, long1, long2) {
  let lon1 = (lon1 * Math.PI) / 180;
  let lon2 = (lon2 * Math.PI) / 180;
  let lat1 = (lat1 * Math.PI) / 180;
  let lat2 = (lat2 * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371;

  // calculate the result
  return c * r;
}
