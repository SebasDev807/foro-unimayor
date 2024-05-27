// TODO: add date when is created the answer

import { responseToQuestion } from "../services/supabase/answers";
import { responseQuestion } from "../services/supabase/posts.js";

const contenedor = document.querySelector("#seccion-preguntas");
const comentarios = document.createElement("dialog");

export async function comentariosHTML(id, titulo, description, userName, emailUser, date) {
  const answers = await responseToQuestion(id);
  console.log("answers modal-comentarios, linea 11: ", answers);

  comentarios.id = "caja-comentarios";
  comentarios.innerHTML = `
    <div class="contenedor-usuario">
      <div class="profile-icon">
        <img class="foto-usuario" src="/imagenes/nik.png" alt="" />
        <div class="profile-metadata">
          <span>${userName}</span>
          <span>${emailUser}</span>
        </div>
      </div>
      <div class="fecha-publicacion">${date}</div>
    </div>
    <h3>${titulo}</h3>
    <p>${description}</p>
    <div class="header-comentarios">
      <button id="btnCerrarModal">X</button>
    </div>
    <div class="contenedor-comentarios">
      <ul class="lista-respuestas"></ul>
    </div>
    <div class="footer-comentarios">
      <input type="text" id="inputComentario" placeholder="Agrega un comentario" />
      <button id="btn-avion" disabled>
        <img src="/imagenes/paperairplane.png" alt="" style="width: 40px; height: 40px;" />
      </button>
    </div>
  `;
  contenedor.appendChild(comentarios);
  comentarios.classList.add("caja-comentarios");
  comentarios.showModal();

  const listaRespuestas = comentarios.querySelector(".lista-respuestas");

  if (answers.length === 0) {
    listaRespuestas.innerHTML = `<li>Sé el primero en comentar</li>`;
  } else {
    answers.forEach((answer) => {
      const comentario = {
        answerDescription: answer.description,
        userName: answer.user_name,
        emailUser: answer.user_email,
        date: answer.created_at  // TODO: implement when created the answer the date to cath
      };
      listaRespuestas.appendChild(createComentarioElement(comentario));
    });
  }

  comentarios.querySelector("#btnCerrarModal").addEventListener("click", () => {
    comentarios.close();
    comentarios.classList.remove("caja-comentarios");
  });

  const inputComentario = comentarios.querySelector("#inputComentario");
  const btnAvion = comentarios.querySelector("#btn-avion");

  inputComentario.addEventListener("input", () => {
    btnAvion.disabled = inputComentario.value.trim() === "";
  });

  btnAvion.addEventListener("click", () => {
    const comentario = inputComentario.value.trim();
    if (comentario) {
      agregarComentario(comentario, titulo, description);
      inputComentario.value = "";
      btnAvion.disabled = true;
    }
  });

  function createComentarioElement({ answerDescription, userName, emailUser, date }) {
    const comentarioElement = document.createElement("li");
    /* TODO
      1) <img class="foto-usuario" src="/imagenes/nik.png" alt="" />  // add image user not implemented
      2) remove styles from HTML and add to CSS
    */
    comentarioElement.innerHTML = `
      <div class="contenedor-usuario">
        <div class="profile-icon">
          
          <div class="profile-metadata" style="margin: 1rem;">
            <span>${userName}</span>
            <span>${emailUser}</span>
          </div>
        </div>
        <div class="fecha-publicacion">${formatDate(date)}</div>
      </div>
      <p>${answerDescription}</p>
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

    const $btnSubirComentario = comentarioElement.querySelector(".btn-subir-comentario");
    const $btnBajarComentario = comentarioElement.querySelector(".btn-bajar-comentario");
    const $contadorSubir = comentarioElement.querySelector(".contador-subir-comentario");

    let contadorSubir = 0;
    let usuarioVotoComentarioSubir = false;
    let usuarioVotoComentarioBajar = false;

    $btnSubirComentario.addEventListener("click", () => {
      if (!usuarioVotoComentarioSubir) {
        contadorSubir++;
        $contadorSubir.textContent = contadorSubir;
        usuarioVotoComentarioSubir = true;
        $btnSubirComentario.disabled = true;
      }
    });

    $btnBajarComentario.addEventListener("click", () => {
      if (!usuarioVotoComentarioBajar && contadorSubir > 0) {
        contadorSubir--;
        $contadorSubir.textContent = contadorSubir;
        usuarioVotoComentarioBajar = true;
        $btnBajarComentario.disabled = true;
      }
    });

    return comentarioElement;
  }

  function agregarComentario(comentario, titulo, description) {
    responseQuestion(comentario, titulo, description);
    const newComment = {
      description: comentario,
      userName: "Usuario desconocido",  // Cambiar esto si tienes el nombre del usuario
      emailUser: "Correo desconocido",  // Cambiar esto si tienes el correo del usuario
      date: new Date().toISOString()  // Usar la fecha actual
    };
    listaRespuestas.appendChild(createComentarioElement(newComment));
  }
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}
