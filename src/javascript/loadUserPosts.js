import { getPosts } from '../services/supabase/posts.js';
import { obtenerFecha,obtenerHora } from './helpers/obtener-tiempo.js';

const fecha = obtenerFecha();
const hora = obtenerHora();

function showPosts() {
  getPosts().then((posts) => {
    console.log(posts);
    const $usersPostContainer = document.getElementById("user-post");
    const fragment = document.createDocumentFragment();

    posts.forEach(({ users, questions }) => {
      const postElement = document.createElement("article");
      postElement.className = "posts";
      postElement.innerHTML = `
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
        <button id="btn-comentar">
          <img src="/imagenes/comentarios.png" alt="" />
        </button>
        <p>${questions.category.name}</p>
        <p>${hora}</p>
      </div>
      `;
      fragment.appendChild(postElement);
    });

    $usersPostContainer.appendChild(fragment);
  });
}
document.addEventListener("DOMContentLoaded", showPosts);
