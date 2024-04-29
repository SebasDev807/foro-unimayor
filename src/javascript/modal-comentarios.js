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

  let contadorSubirDescripcion = 0; // Inicializar contador de votos positivos para la descripción principal

  comentarios.id = "caja-comentarios";
  comentarios.innerHTML = `
    <div class="header-comentarios">
      <h3>${titulo}</h3>
      <button id="btnCerrarModal">X</button>
    </div>
    <div class="contenedor-comentarios">
      <ul class="lista-respuestas">
        <li>
          <p>${descripcion}</p>
          <div class="contenedor-botones-post-comentarios">
            ${answers.length > 0 ? `
              <button id="btn-subir-descripcion">
                <img src="/imagenes/up-botton-blue.png" alt="" />
              </button>
              <span id="contador-subir-descripcion">${contadorSubirDescripcion}</span>
              <button id="btn-bajar-descripcion">
                <img src="/imagenes/down-botton-white.png" alt="" />
              </button>
            ` : ''}
          </div>
        </li>
      </ul>
    </div>
    <div class="footer-comentarios">
      <input type="text" id="inputComentario" placeholder="Agrega un comentario" >
      <button id="btn-avion">
        <img src="/imagenes/paperairplane.png" alt="" style="width: 40px; height: 40px;"> <!-- Imagen en lugar del botón -->
      </button>
    </div>
  `;
  contenedor.appendChild(comentarios);
  comentarios.classList.add("caja-comentarios");
  comentarios.showModal();

  const btnCerrarModal = comentarios.querySelector("#btnCerrarModal");
  const btnAvion = comentarios.querySelector("#btn-avion");
  const inputComentario = comentarios.querySelector("#inputComentario");
  const listaRespuestas = comentarios.querySelector(".lista-respuestas");
  const mensajeNoComentarios = comentarios.querySelector("#mensaje-no-comentarios");

  btnCerrarModal.addEventListener("click", () => {
    comentarios.close();
    comentarios.classList.remove("caja-comentarios");
  });
  listaRespuestas.style.listStyle = "none";

  // Manejador de eventos para el botón de subir para la descripción principal
  const btnSubirDescripcion = comentarios.querySelector("#btn-subir-descripcion");
  if (btnSubirDescripcion) {
    btnSubirDescripcion.addEventListener("click", () => {
      if (contadorSubirDescripcion < 1) {
        contadorSubirDescripcion++;
        actualizarContadorDescripcion();
      }
    });
  }

  // Manejador de eventos para el botón de bajar para la descripción principal
  const btnBajarDescripcion = comentarios.querySelector("#btn-bajar-descripcion");
  if (btnBajarDescripcion) {
    btnBajarDescripcion.addEventListener("click", () => {
      if (contadorSubirDescripcion > 0) {
        contadorSubirDescripcion--;
        actualizarContadorDescripcion();
      }
    });
  }

  // Función para actualizar el contador en la descripción principal
  function actualizarContadorDescripcion() {
    const contadorSubirDescripcionSpan = comentarios.querySelector("#contador-subir-descripcion");
    contadorSubirDescripcionSpan.textContent = contadorSubirDescripcion;
  }

  // Manejador de eventos para el campo de entrada de comentarios
  inputComentario.addEventListener("input", () => {
    // Habilitar o deshabilitar el botón de enviar según si hay texto en el campo de entrada
    btnAvion.disabled = inputComentario.value.trim() === "";
  });

  // Manejador de eventos para el botón "avion"
  btnAvion.addEventListener("click", () => {
    const comentario = inputComentario.value.trim();
    if (comentario !== "") {
      agregarComentario(comentario);
      inputComentario.value = ""; // Limpiar el campo de entrada después de agregar el comentario
      btnAvion.disabled = true; // Deshabilitar el botón después de agregar el comentario
      if (mensajeNoComentarios) {
        mensajeNoComentarios.style.display = "none"; // Ocultar mensaje de no hay comentarios
      }
    }
  });

  // Función para agregar un comentario al contenedor de comentarios
  function agregarComentario(comentario) {
    const nuevoComentario = document.createElement("li");
    nuevoComentario.innerHTML = `
      <p>${comentario}</p>
      <div class="contenedor-botones-post-comentarios">
        <button class="btn-subir-comentario">
          <img src="/imagenes/up-botton-blue.png" alt="" />
        </button>
        <span class="contador-subir-comentario">0</span>
        <button class="btn-bajar-comentario">
          <img src="/imagenes/down-botton-white.png" alt="" />
        </button>
      </div>
    `;

    // Obtener los botones de subir y bajar del nuevo comentario
    const $btnSubirComentario = nuevoComentario.querySelector(".btn-subir-comentario");
    const $btnBajarComentario = nuevoComentario.querySelector(".btn-bajar-comentario");

    let contadorSubir = 0; // Inicializar contador de votos positivos para este comentario
    let usuarioVotoComentarioSubir = false;
    let usuarioVotoComentarioBajar = false;

    // Manejador de eventos para el botón de subir del nuevo comentario
    $btnSubirComentario.addEventListener("click", () => {
      if (!usuarioVotoComentarioSubir) {
        contadorSubir++;
        actualizarContador();
        usuarioVotoComentarioSubir = true;
        // Deshabilitar botón de subir
        $btnSubirComentario.disabled = true;
      }
    });

    // Manejador de eventos para el botón de bajar del nuevo comentario
    $btnBajarComentario.addEventListener("click", () => {
      if (!usuarioVotoComentarioBajar && contadorSubir > 0) {
        contadorSubir--;
        actualizarContador();
        usuarioVotoComentarioBajar = true;
        // Deshabilitar botón de bajar
        $btnBajarComentario.disabled = true;
      }
    });

    // Función para actualizar el contador en el HTML
    function actualizarContador() {
      const $contadorSubir = nuevoComentario.querySelector(".contador-subir-comentario");
      $contadorSubir.textContent = contadorSubir;
    }

    listaRespuestas.appendChild(nuevoComentario);
    if (mensajeNoComentarios) {
      mensajeNoComentarios.style.display = "none"; // Ocultar mensaje de no hay comentarios después de agregar uno
    }
  }
}
