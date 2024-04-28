// Tu archivo principal
import { getPosts } from "../services/supabase/posts.js";
import { obtenerFecha, obtenerHora } from "./helpers/obtener-tiempo.js";
// import { comentariosHTML } from "../javascript/modal-comentarios.js";

const fecha = obtenerFecha();
const hora = obtenerHora();
loadHtml();
import { handleQuestionClick } from "../javascript/handler/questionClick.js";

function showPosts() {
  getPosts().then((posts) => {
    console.log(posts);
    const $usersPostContainer = document.getElementById("user-post");
    const $fragment = document.createDocumentFragment();

    posts.forEach(({ users, questions }) => {
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
        <button id="btn-subir">
        <img src="/imagenes/up-botton-blue.png" alt="" />
        </button>
        <button id="btn-bajar">
          <img src="/imagenes/down-botton-white.png" alt="" />
        </button>
        <p class= "categoria">${questions.category.name}</p>
        <p>${hora}</p>
      </div>
      `;

      // Crear el elemento de imagen
      const $imageElement = document.createElement("img");
      $imageElement.id = questions.id;
      $imageElement.src = "/imagenes/comentarios.png";
      $imageElement.alt = "responder pregunta";
      $imageElement.style = "width: 25px; height: 25px;";
      $imageElement.style.cursor = "pointer";

      // Adjuntar el controlador de eventos a la imagen
      $imageElement.addEventListener("click", handleQuestionClick);

      // Agregar la imagen al elemento del post
      const contenedorBotones = $postElement.querySelector(".contenedor-botones-post");
      contenedorBotones.insertBefore($imageElement, contenedorBotones.firstChild)

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
