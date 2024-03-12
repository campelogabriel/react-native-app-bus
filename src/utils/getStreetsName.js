const getStreet = async (coords) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.at(
      0
    )},${coords.at(1)}&key=${process.env.EXPO_PUBLIC_KEY_GOOGLE_MAPS}`
  );
  const data = await res.json();
  return data;
};

export default getStreet;
