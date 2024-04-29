const contenedor = document.querySelector("#seccion-preguntas");
const comentarios = document.createElement("dialog");

export function comentariosHTML() {
  comentarios.id = "caja-comentarios";
  comentarios.innerHTML = `
    <div class="header-comentarios">
      <h3>Titulo</h3>
      <button id="btnCerrarModal">X</button>
    </div>
    <div class="contenedor-comentarios">
      <ul class="lista-respuestas">
        <h1>Aun no hay comentarios</h1>
      </ul>
    </div>
    <div class="footer-comentarios">
      <input type="text" placeholder="Agrega un comentario">
      <button>avión</button>
    </div>
  `;
  contenedor.appendChild(comentarios);
  comentarios.classList.add("caja-comentarios");
  comentarios.showModal();

  const btnCerrarModal = comentarios.querySelector("#btnCerrarModal");

  btnCerrarModal.addEventListener("click", () => {
    comentarios.close();
    comentarios.classList.remove("caja-comentarios");
  });
}


