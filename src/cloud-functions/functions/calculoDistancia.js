exports.calculeDistance = (busLat, personLat, busLng, personLng) => {
  let lon1 = (busLng * Math.PI) / 180;
  let lon2 = (personLng * Math.PI) / 180;
  let lat1 = (busLat * Math.PI) / 180;
  let lat2 = (personLat * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371;
  let valueInKm = c * r;
  // calculate the result
  return valueInKm * 1000;
};
