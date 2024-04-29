import { responseToQuestion } from "../services/supabase/answers";
import { obtenerFecha, obtenerHora } from "./helpers/obtener-tiempo.js";

const fecha = obtenerFecha();
const hora = obtenerHora();

const contenedor = document.querySelector("#seccion-preguntas");
const comentarios = document.createElement("dialog");

export async function comentariosHTML(id, titulo) {
  // Espera a que la promesa se resuelva y obtiene las respuestas
  const answers = await responseToQuestion(id);

  // Si hay al menos una respuesta
  const primeraRespuesta = answers[0];
  let descripcion;

  if (answers.length === 0) {
    descripcion = "No hay comentarios";
  } else {
    descripcion = primeraRespuesta.description;
  }

  let contadorSubir = 0; // Inicializar contador de votos positivos

  comentarios.id = "caja-comentarios";
  comentarios.innerHTML = `
    <div class="header-comentarios">
      <h3>${titulo}</h3>
      <button id="btnCerrarModal">X</button>
    </div>
    <div class="contenedor-comentarios">
      <ul class="lista-respuestas">
        <p>${descripcion}</p>
        <div class="contenedor-botones-post-comentarios" ${answers.length === 0 ? 'style="display: none;"' : ''}>
          <button id="btn-subir">
            <img src="/imagenes/up-botton-blue.png" alt="" />
          </button>
          <span id="contador-subir">${contadorSubir}</span> <!-- Contador de subir -->
          <button id="btn-bajar">
            <img src="/imagenes/down-botton-white.png" alt="" />
          </button>
        </div>
      </ul>
    </div>
    <div class="footer-comentarios">
      <input type="text" placeholder="Agrega un comentario" >
      <img src="/imagenes/paperairplane.png" alt="" id="btn-avion" style="width: 40px; height: 40px;"> <!-- Imagen en lugar del botón -->
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

  // botones de subir y bajar
  const $btnSubir = comentarios.querySelector("#btn-subir");
  const $btnBajar = comentarios.querySelector("#btn-bajar");

  // Manejador de eventos para el botón de subir
  $btnSubir.addEventListener("click", () => {
    if (contadorSubir < 1) { // Permitir solo un incremento
      contadorSubir++;
      $btnSubir.disabled = true; // Deshabilitar el botón después del primer clic
      actualizarContador();
    }
  });

  // Manejador de eventos para el botón de bajar
  $btnBajar.addEventListener("click", () => {
    if (contadorSubir > 0) {
      contadorSubir--;
      $btnSubir.disabled = false; 
      actualizarContador();
    }
  });

  // Función para actualizar el contador en html
  function actualizarContador() {
    const $contadorSubir = comentarios.querySelector("#contador-subir");
    $contadorSubir.textContent = contadorSubir;
  }
}
