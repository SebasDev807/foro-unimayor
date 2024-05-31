import { responseToQuestion } from "../services/supabase/answers";
import { createResponseToQuestion, deleteResponseToQuestion } from "../services/supabase/posts.js"; // Asegúrate de importar la función de eliminación
import { incrementCounter, decrementCounter } from "../services/supabase/likes.js";
import { userLogged } from "../services/supabase/auth.js";
import supabase from "../services/supabase/supabaseClient.js";
import { dateTimeISO8601, formatDate } from "./helpers/obtener-tiempo.js";
import { notificarRespuesta } from "./helpers/notificacion.js";

const contenedor = document.querySelector("#seccion-preguntas");
const comentarios = document.createElement("dialog");

export async function comentariosHTML(id, titulo, description, userName, emailUser, date) {
  const answers = await responseToQuestion(id);

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
      <button id="btnCerrarModal">X</button>
    </div>
    <h3>${titulo}</h3>
    <p>${description}</p>
    <div class="header-comentarios">

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
        date: answer.created_at,
        answersId: answer.id,
        likes: answer.likes
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

  function createComentarioElement({ answerDescription, userName, emailUser, date, answersId, likes }) {
    const comentarioElement = document.createElement("li");
    let contadorSubir = likes;
    comentarioElement.innerHTML = `
      <div class="contenedor-usuario">
        <div class="profile-icon">
          
          <div class="profile-metadata" style="margin: 1rem;">
            <span>${userName}</span>
            <span>${emailUser}</span>
          </div>
        </div>
        <div class="fecha-publicacion">${formatDate(date)}</div>
        <button class="btn-eliminar-comentario">
        <img src="/imagenes/borrar.png" alt= "">
        </button> <!-- Añadido botón de eliminar -->
      </div>
      
      <p>${answerDescription}</p>
      <div class="contenedor-botones-post-comentarios">
        <button class="btn-subir-comentario">
          <img src="/imagenes/up-botton-blue.png" alt="" />
        </button>
        <span class="contador-subir-comentario">${contadorSubir}</span>
        <button class="btn-bajar-comentario">
          <img src="/imagenes/down-botton-white.png" alt="" />
        </button>
      </div>
    `;

    const $btnSubirComentario = comentarioElement.querySelector(".btn-subir-comentario");
    const $btnBajarComentario = comentarioElement.querySelector(".btn-bajar-comentario");
    const $btnEliminarComentario = comentarioElement.querySelector(".btn-eliminar-comentario"); // Selección del botón de eliminar
    const $contadorSubir = comentarioElement.querySelector(".contador-subir-comentario");

    let usuarioVotoComentarioSubir = false;
    let usuarioVotoComentarioBajar = false;

    $btnSubirComentario.addEventListener("click", async () => {
      if (!usuarioVotoComentarioSubir) {
        await incrementCounter(answersId, "answers"); // supabase function

        contadorSubir++;
        $contadorSubir.textContent = contadorSubir;
        usuarioVotoComentarioSubir = true;
        $btnSubirComentario.disabled = true;
      }
    });

    $btnBajarComentario.addEventListener("click", async () => {
      await decrementCounter(answersId, "answers"); // supabase function

      if (!usuarioVotoComentarioBajar && contadorSubir > 0) {
        contadorSubir--;
        $contadorSubir.textContent = contadorSubir;
        usuarioVotoComentarioBajar = true;
        $btnBajarComentario.disabled = true;
      }
    });

    // Evento para eliminar comentario
    $btnEliminarComentario.addEventListener("click", async () => {
      const confirmacion = confirm("¿Estás seguro de que deseas eliminar este comentario?");
      if (confirmacion) {
        await eliminarComentario(answersId);
        comentarioElement.remove();
      }
    });

    return comentarioElement;
  }

  async function agregarComentario(comentario, titulo, description) {
    const metadata = await userLogged();
    const name = metadata.user_metadata.name;
    const { email } = metadata;

    const { data: userData } = await supabase
      .from("users")
      .select("id")
      .eq("email", metadata.email)
      .single();
    const { id, id: idAuthUser } = userData;
    console.log(name);

    await createResponseToQuestion(comentario, titulo, description, idAuthUser);

    const newComment = {
      answerDescription: comentario,
      userName: name,
      emailUser: email,
      date: formatDate(dateTimeISO8601())
    };
    listaRespuestas.appendChild(createComentarioElement(newComment));
    notificarRespuesta(name, comentario);
  }

  // Función para eliminar comentario de Supabase y del DOM
  async function eliminarComentario(answersId) {
    const { error } = await deleteResponseToQuestion(answersId); // Supabase function to delete
    if (error) {
      console.error("Error eliminando el comentario:", error);
    } else {
      console.log("Comentario eliminado exitosamente.");
    }
  }
}


