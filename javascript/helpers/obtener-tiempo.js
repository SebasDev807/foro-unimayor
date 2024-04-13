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

function obtenerFecha() {
  let now = new Date();
  let diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  let dia = diasSemana[now.getDay()];

  let mes = now.getMonth() + 1;
  let year = now.getFullYear();

  return `${dia}/${mes}/${year}`;
}

export { obtenerHora, obtenerFecha };
