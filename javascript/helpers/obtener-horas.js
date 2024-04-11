function obtenerHora() {
    let now = new Date();
    let horas = now.getHours();
    let minutos = now.getMinutes();
    let horaFormateada = `${horas} : ${minutos < 10 ? '0' + minutos : minutos}`;
    return horaFormateada;
}

export { obtenerHora };