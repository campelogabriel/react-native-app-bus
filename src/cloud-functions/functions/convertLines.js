"use strict";
// OBS: Para procurar pelas linhas troncais, integradas e circulares, procurar por:
// 100=TRO1, 102=TRO2, 106=TRO3, 104=TRO4, 105=TRO5, 108=TRO6, 117=TRO7, 118=TRO8, 109=TRO9,
// 101=TRO10;
// 551=INT1, 552=INT2, 558=INT6, 553=INT8, 554=INT9;
// 551=CIR1, 552=CIR2.

const convertNamesLine = (line) => {
  let linha;

  if (line.startsWith("TRO")) {
    if (line.includes("1")) linha = "100";
    if (line.includes("2")) linha = "102";
    if (line.includes("3")) linha = "106";
    if (line.includes("4")) linha = "104";
    if (line.includes("5")) linha = "105";
    if (line.includes("6")) linha = "108";
    if (line.includes("7")) linha = "117";
    if (line.includes("8")) linha = "118";
    if (line.includes("9")) linha = "109";
    if (line.includes("10")) linha = "101";
    return linha;
  }
  if (line.startsWith("INT")) {
    // 551=INT1, 552=INT2, 558=INT6, 553=INT8, 554=INT9;
    if (line.includes("1")) linha = "551";
    if (line.includes("2")) linha = "552";
    if (line.includes("6")) linha = "558";
    if (line.includes("8")) linha = "553";
    if (line.includes("9")) linha = "554";
    return linha;
  }
  if (line.startsWith("CIR")) {
    // 551=CIR1, 552=CIR2.
    if (line.includes("1")) linha = "581";
    if (line.includes("2")) linha = "582";
    return linha;
  }
};

exports.reconvertLines = (line) => {
  let reconverted;
  switch (line) {
    case "581":
      reconverted = "CIR1";
      break;
    case "582":
      reconverted = "CIR2";
      break;
    // 551=INT1, 552=INT2, 558=INT6, 553=INT8, 554=INT9;
    case "551":
      reconverted = "INT 1";
      break;
    case "552":
      reconverted = "INT 2";
      break;
    case "558":
      reconverted = "INT 6";
      break;
    case "553":
      reconverted = "INT 8";
      break;
    case "554":
      reconverted = "INT 9";
      break;
    // 100=TRO1, 102=TRO2, 106=TRO3, 104=TRO4, 105=TRO5, 108=TRO6, 117=TRO7, 118=TRO8, 109=TRO9,
    // 101=TRO10;
    case "100":
      reconverted = "TRONCAL 1";
      break;
    case "102":
      reconverted = "TRONCAL 2";
      break;
    case "106":
      reconverted = "TRONCAL 3";
      break;
    case "104":
      reconverted = "TRONCAL 4";
      break;
    case "105":
      reconverted = "TRONCAL 5";
      break;
    case "108":
      reconverted = "TRONCAL 6";
      break;
    case "117":
      reconverted = "TRONCAL 7";
      break;
    case "118":
      reconverted = "TRONCAL 8";
      break;
    case "119":
      reconverted = "TRONCAL 9";
      break;
    case "101":
      reconverted = "TRONCAL 10";
      break;
    default:
      reconverted = line;
      break;
  }
  return reconverted;
};

exports.convertLines = (line) => {
  let linha = line.toUpperCase();

  // convertendo linhas
  if (
    linha.startsWith("TRO") ||
    linha.startsWith("INT") ||
    linha.startsWith("CIR")
  ) {
    linha = convertNamesLine(linha);

    return linha;
  }

  //Removendo letras
  // const newLine = linha.match(/[0-9]/g).join("");

  return linha;
};
