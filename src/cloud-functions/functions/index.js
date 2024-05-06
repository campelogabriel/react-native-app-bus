const { onRequest } = require("firebase-functions/v2/https");
const { calculeDistance } = require("./calculoDistancia.js");
const { setGlobalOptions } = require("firebase-functions/v2");
const { convertLines, reconvertLines } = require("./convertLines.js");
const lineInfo = require("./lineInfo.js");
const busStops = require("./busStops.json");
setGlobalOptions({ region: "southamerica-east1" });

exports.getBusLines = onRequest(async (req, res) => {
  const { line, lat, lng } = req.query;

  const consorcio = [
    { agency_id: "20001", agency_name: "MOBI-Rio" },
    { agency_id: "22002", agency_name: "Intersul" },
    { agency_id: "22003", agency_name: "Internorte" },
    { agency_id: "22004", agency_name: "Transcarioca" },
    { agency_id: "22005", agency_name: "Santa Cruz" },
  ];

  let linesArr = [];

  if (line) linesArr = String(line).split(",");

  linesArr = linesArr.map((line) => convertLines(line));

  let dataNow = new Date();
  let dataDelay = +dataNow - 60000;
  dataNow = dataNow.toISOString();
  dataDelay = new Date(dataDelay).toISOString();

  const response = await fetch(
    `https://dados.mobilidade.rio/gps/sppo?dataInicial=${dataDelay}&dataFinal=${dataNow}`
  );
  const data = await response.json();

  // Pegando onibus por linhas
  let busLines = [];

  linesArr.map((line) => {
    busLines = [...busLines, ...data.filter((onibus) => onibus.linha == line)];
  });

  let formatedBus = [];

  //calculando distancia

  busLines.map((bus) => {
    const distance = calculeDistance(
      bus.latitude.replace(",", "."),
      +lat,
      +bus.longitude.replace(",", "."),
      +lng
    );
    formatedBus = [
      ...formatedBus,
      {
        ordem: bus.ordem,
        linha: reconvertLines(bus.linha),
        latitude: bus.latitude,
        longitude: bus.longitude,
        distancia: +distance,
        velocidade: bus.velocidade,
        datahora: bus.datahoraenvio,
        ...lineInfo(bus.linha),
      },
    ];
  });

  res.status(200).json({
    status: "success",
    data: {
      buses: formatedBus,
    },
  });
});

exports.getNextBusStop = onRequest(async (req, res) => {
  const { lat, lng } = req.query;
  let parada = {};
  let value = 0;

  busStops.map((busStop) => {
    const { stop_lat: latBus, stop_lon: lngBus } = busStop;
    const distanceBusStop = calculeDistance(latBus, lat, lngBus, lng);
    if (distanceBusStop < value || !value) {
      parada = busStop;
      value = distanceBusStop;
    }
  });

  res.status(200).json({
    status: "success",
    data: {
      stop: parada,
    },
  });
});
