/**
 * Aumenta el largo ancho del area de texto a medida que se ingresa texto
 * @param {HTMLTextAreaElement} textArea - elemento del dom a modificar
 */

const area = document.querySelector("#cuerpo-pregunta");

area.addEventListener("input", () => {
  area.style.height = "auto";
  area.style.height = area.scrollHeight + "px";
});
