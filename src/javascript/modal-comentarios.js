import { responseToQuestion } from "../services/supabase/answers";

const contenedor = document.querySelector("#seccion-preguntas");
const comentarios = document.createElement("dialog");

export async function comentariosHTML(id) {
  // Espera a que la promesa se resuelva y obtiene las respuestas
  const answers = await responseToQuestion(id);

  // Si hay al menos una respuesta

  const primeraRespuesta = answers[0];
  let descripcion;
  
  if (answers.length === 0) {
    descripcion = "No hay comentarios"
  }else{
    descripcion = primeraRespuesta.description;
  }

  comentarios.id = "caja-comentarios";
  comentarios.innerHTML = `
    <div class="header-comentarios">
      <h3>Titulo</h3>
      <button id="btnCerrarModal">X</button>
    </div>
    <div class="contenedor-comentarios">
      <ul class="lista-respuestas">
        <p>${descripcion}</h1>
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
