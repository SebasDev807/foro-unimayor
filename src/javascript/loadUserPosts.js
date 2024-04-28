import { getPosts } from '../services/supabase/posts.js';
import { handleQuestionClick } from "../javascript/handler/questionClick.js"

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
          <div class="header">
            <img src="/imagenes/nik.png" alt="" class="foto-usuario" />
            <span class="usuario"> ${users.name} </span>
            <span class="username"> @${users.name} </span>
            <button class="lineas">
              <img src="/imagenes/lines.png" alt="" />
            </button>
          </div>
          <div class="titulo">
            <h1>${questions.title}</h1>
          </div>
        </section>
        <section>
          <div class="footer">
            <p>${questions.description}</p>
            <div class="boton-footer">
              <button class="boton-subir">
                <img src="/imagenes/up-botton-blue.png" alt="" />
              </button>
              <button class="boton-bajar">
                <img src="/imagenes/down-botton-white.png" alt="" />
              </button>
            </div>
            <div class="materia">
              <p>${questions.category.name}</p>
            </div>
          </div>
      `;

      // Crear el elemento de imagen
      const $imageElement = document.createElement("img");
      $imageElement.id = questions.id;
      $imageElement.src = "/imagenes/comentarios.png";
      $imageElement.alt = "responder pregunta";
      $imageElement.style = "width: 25px; height: 25px;";

      // Adjuntar el controlador de eventos a la imagen
      $imageElement.addEventListener("click", handleQuestionClick);

      // Agregar la imagen al elemento del post
      $postElement.querySelector(".boton-footer").appendChild($imageElement);

      $fragment.appendChild($postElement);
    });

    $usersPostContainer.appendChild($fragment);
  });
}
document.addEventListener("DOMContentLoaded", showPosts);