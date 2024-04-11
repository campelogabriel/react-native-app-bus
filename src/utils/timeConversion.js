export default function (diff) {
  let time;
  if (diff == 60) {
    time = `1 minuto atrás`;
  } else if (diff <= 30) {
    time = "Agora mesmo";
  } else if (diff >= 31 && diff <= 59) {
    time = `${Math.round(diff)} segundos atrás`;
  } else if (diff >= 60 && diff <= 119) {
    time = `${Math.round(diff / 60)} minuto atrás`;
  } else if (diff >= 3600) {
    time = `Mais de ${Math.round(diff / (60 * 60))} horas atrás`;
  } else {
    time = `${Math.round(diff / 60)} minutos atrás`;
  }
  return time;
}
