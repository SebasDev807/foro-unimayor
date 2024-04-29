import { getPosts } from "../services/supabase/posts.js";
import { obtenerFecha, obtenerHora } from "./helpers/obtener-tiempo.js";

const fecha = obtenerFecha();
const hora = obtenerHora();
loadHtml();

function showPosts() {
  getPosts().then((posts) => {
    console.log(posts);
    const $usersPostContainer = document.getElementById("user-post");
    const $fragment = document.createDocumentFragment();

    posts.forEach(({ users, questions }) => {
      let contadorSubir = 0; // Inicializar contador de votos positivos
      let contadorBajar = 0; // Inicializar contador de votos negativos

      const $postElement = document.createElement("article");
      // $postElement.className = "posts";
      // $postElement.id = questions.id;
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
        <span id="contador-bajar">${contadorBajar}</span> <!-- Contador de bajar -->
        <button id="btn-comentar">
          <img src="/imagenes/comentarios.png" alt="" />
        </button>
        </div>
        <div>
        <p class= "categoria">${questions.category.name}</p>
        <p>${hora}</p>
        </div>
      </div>
      `;

      // Incrementar contador de votos al hacer clic en el botón de subir
      const $btnSubir = $postElement.querySelector("#btn-subir");
      $btnSubir.addEventListener("click", () => {
        contadorSubir++;
        const $contadorSubir = $postElement.querySelector("#contador-subir");
        $contadorSubir.textContent = contadorSubir;
      });

      // Decrementar el contador de subir al hacer clic en el botón de bajar
      const $btnBajar = $postElement.querySelector("#btn-bajar");
      $btnBajar.addEventListener("click", () => {
        if (contadorSubir > 0) {
          contadorSubir--;
          const $contadorSubir = $postElement.querySelector("#contador-subir");
          $contadorSubir.textContent = contadorSubir;
        }
      });

      // Event listener para abrir el modal de comentarios
      const $btnComentar = $postElement.querySelector("#btn-comentar");
      $btnComentar.addEventListener("click", () => {
        comentariosHTML();
      });

      $fragment.appendChild($postElement);
    });

    $usersPostContainer.appendChild($fragment);
    loadHtml(); // Esto puede no ser necesario si llamas a loadHtml en el event listener
  });
}

function loadHtml() {
  const botonComentar = document.querySelector("#btn-comentar");
  if (botonComentar) {
    botonComentar.addEventListener("click", () => {
      comentariosHTML();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showPosts();
});
