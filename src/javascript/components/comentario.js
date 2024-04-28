// Función para cargar el HTML
function renderizarComentarios() {
  const btnComentar = document.querySelector("#btn-comentar");
  if (btnComentar) {
    btnComentar.addEventListener("click", () => {
        alert('Comentarios');
    });
  }
}

function cargarHTML(){
    
}

export { renderizarComentarios };
