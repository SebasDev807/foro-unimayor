/**
 * Aumenta el largo ancho del area de texto a medida que se ingresa texto
 * @param {HTMLTextAreaElement} textArea - elemento del dom a modificar
 */
function autoResize(textArea) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
}
