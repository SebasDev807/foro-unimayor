function obtenerHora() {
  let now = new Date();
  let horas = now.getHours();
  let minutos = now.getMinutes();
  let ampm = horas >= 12 ? "PM" : "AM";

  if (horas > 12) {
    horas -= 12;
  } else if (horas === 0) {
    horas = 12;
  }

  let horaFormateada = `${horas}:${
    minutos < 10 ? "0" + minutos : minutos
  } ${ampm}`;
  return horaFormateada;
}

export { obtenerHora };
