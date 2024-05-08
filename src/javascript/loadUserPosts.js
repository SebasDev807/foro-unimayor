import { getPosts } from "../services/supabase/posts.js";
import { handleQuestionClick } from "./handler/questionClick.js";
import { obtenerFecha, obtenerHora } from "./helpers/obtener-tiempo.js";
import { comentariosHTML } from "./modal-comentarios.js";

const fecha = obtenerFecha();
const hora = obtenerHora();

function showPosts() {
  getPosts().then((posts) => {
    console.log(posts);
    const $usersPostContainer = document.getElementById("user-post");
    const $fragment = document.createDocumentFragment();

    posts.forEach(({ users, questions },index) => {
      let contadorSubir = 0; // Inicializar contador de votos positivos

      const $postElement = document.createElement("article");
      $postElement.innerHTML = `
      <div class="contenedor-usuario">
        <img src="/imagenes/nik.png" alt="" class="foto-usuario" />
        <p>${users.name}</p>
        <p>@${users.name}</p>
        <p>${fecha}</p>        
      </div>
      <h2>${questions.title}</h2>
      <p>${questions.description}</p>
      <div class="contenedor-botones-post">
        <div>
          <button id="btn-subir">
            <img src="/imagenes/up-botton-blue.png" alt="" />
          </button>
          <span id="contador-subir">${contadorSubir}</span> <!-- Contador de subir -->
          <button id="btn-bajar">
            <img src="/imagenes/down-botton-white.png" alt="" />
          </button>
          <button id="btn-comentar">
            <img src="/imagenes/comentarios.png" alt="" />
          </button>
        </div>
        <div class="info-post">
          <p class="categoria">${questions.category.name}</p>
          <p>${hora}</p>
        </div>
      </div>
      `;

      // Incrementar contador de votos al hacer clic en el botón de subir
      const $btnSubir = $postElement.querySelector("#btn-subir");
      $btnSubir.addEventListener("click", () => {
        if (contadorSubir === 0) {
          contadorSubir++;
          const $contadorSubir = $postElement.querySelector("#contador-subir");
          $contadorSubir.textContent = contadorSubir;

          // Deshabilitar el botón de subir después de incrementar el contador
          $btnSubir.disabled = true;
        }
      });

      // Decrementar el contador de subir al hacer clic en el botón de bajar
      const $btnBajar = $postElement.querySelector("#btn-bajar");
      $btnBajar.addEventListener("click", () => {
        if (contadorSubir > 0) {
          contadorSubir--;
          const $contadorSubir = $postElement.querySelector("#contador-subir");
          $contadorSubir.textContent = contadorSubir;

          // Habilitar el botón de subir cuando se presiona el botón de bajar
          $btnSubir.disabled = false;
        }
      });

      // Event listener para abrir el modal de comentarios
      const $btnComentar = $postElement.querySelector("#btn-comentar");
      $btnComentar.addEventListener("click", (e) => {
        comentariosHTML(index+1, questions.title); // Pasar el título como argumento
      });

      $fragment.appendChild($postElement);
    });

    $usersPostContainer.appendChild($fragment);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showPosts();
});
