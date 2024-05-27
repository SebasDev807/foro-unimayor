import { responseToQuestion } from "../services/supabase/answers";
import { obtenerFecha, obtenerHora } from "./helpers/obtener-tiempo.js";

const fecha = obtenerFecha();
const hora = obtenerHora();

const contenedor = document.querySelector("#seccion-preguntas");
const comentarios = document.createElement("dialog");

// Lista de nombres de usuarios aleatorios
const nombresDeUsuarios = ["Usuario1", "Usuario2", "Usuario3", "Usuario4", "Usuario5"];

function obtenerNombreAleatorio() {
  const indice = Math.floor(Math.random() * nombresDeUsuarios.length);
  return nombresDeUsuarios[indice];
}

export async function comentariosHTML(id, titulo) {
  // Espera a que la promesa se resuelva y obtiene las respuestas
  const answers = await responseToQuestion(id);

  // Si hay al menos una respuesta
  const primeraRespuesta = answers[0];
  let descripcion;

  if (answers.length === 0) {
    descripcion = "Sé el primero en comentar";
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
        <li id="mensaje-no-comentarios" ${answers.length === 0 ? '' : 'style="display:none;"'}>
          <p>${descripcion}</p>
        </li>
        ${answers.length > 0 ? `
        <li>
          <p>${descripcion}</p>
          <div class="contenedor-botones-post-comentarios">
            <button id="btn-subir-descripcion">
              <img src="/imagenes/up-botton-blue.png" alt="" />
            </button>
            <span id="contador-subir-descripcion">${contadorSubirDescripcion}</span>
            <button id="btn-bajar-descripcion">
              <img src="/imagenes/down-botton-white.png" alt="" />
            </button>
          </div>
        </li>
        ` : ''}
      </ul>
    </div>
    <div class="footer-comentarios">
      <input type="text" id="inputComentario" placeholder="Agrega un comentario">
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

  function actualizarContadorDescripcion() {
    const contadorSubirDescripcionSpan = comentarios.querySelector("#contador-subir-descripcion");
    contadorSubirDescripcionSpan.textContent = contadorSubirDescripcion;
  }

  inputComentario.addEventListener("input", () => {
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

  function agregarComentario(comentario) {
    const nuevoComentario = document.createElement("li");
    const nombreUsuario = obtenerNombreAleatorio();
    const horaActual = obtenerHora();
    nuevoComentario.innerHTML = `
      <div class="contenedor-usuario-comentario">
        <img src="/imagenes/nik.png" alt="" class="foto-usuario-comentario" />
        <div class="contenedor-nombre-usuario">
          <p><strong>${nombreUsuario}</strong></p>
        </div>
        <button class="btn-eliminar-comentario">
        <img src="/imagenes/delete.png" alt="Eliminar comentario" style="width: 20px; height: 20px;" />
        </button>
      </div>
      <p>${comentario}</p>
      <div class="contenedor-botones-post-comentarios">
        <button class="btn-subir-comentario">
          <img src="/imagenes/up-botton-blue.png" alt="" />
        </button>
        <span class="contador-subir-comentario">0</span>
        <button class="btn-bajar-comentario">
          <img src="/imagenes/down-botton-white.png" alt="" />
        </button>
        <span class="hora-comentario">${horaActual}</span>
      </div>
    `;

    // botón para poder eliminar comentario
    const btnEliminarComentario = nuevoComentario.querySelector(".btn-eliminar-comentario");
    btnEliminarComentario.addEventListener("click", () => {
        if (confirm("¿Quieres eliminar el comentario?")) {
            listaRespuestas.removeChild(nuevoComentario); 
        }
    });

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
      mensajeNoComentarios.style.display = "none"; // Ocultar mensaje de no hay comentarios 
    }
}
}
