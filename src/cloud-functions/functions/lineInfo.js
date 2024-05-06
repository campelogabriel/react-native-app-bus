const lineInfo = require("./route.json");

const getLineInfo = (line) => {
  const [lines] = lineInfo.filter(
    (lineInfo) => lineInfo.route_short_name == line
  );

  return {
    backgroundColor: lines.route_color,
    textColor: lines.route_text_color,
    trajeto: lines.route_long_name,
    consorcio: lines.agency_id.split("/")[5],
  };
};

module.exports = getLineInfo;
