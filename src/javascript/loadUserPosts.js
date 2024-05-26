// TODO: refresh feature to when adding a new post, it re-renders the content or refreshes
import { getPosts } from "../services/supabase/posts.js";
import { responseToQuestion } from "../services/supabase/answers.js";
import { handleQuestionClick } from "./handler/questionClick.js";
import { obtenerFecha, obtenerHora } from "./helpers/obtener-tiempo.js";
import { comentariosHTML } from "./modal-comentarios.js";

function renderPosts(posts) {
  const $usersPostContainer = document.getElementById("user-post");
  const $fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const $postElement = createPostElement(post);
    $fragment.appendChild($postElement);
  });

  $usersPostContainer.appendChild($fragment);
}

function createPostElement({ id: questionId, title, description, users }) {
  const $postElement = document.createElement("article");
  let contadorSubir = 0;

  const userName = users ? users.name : "Usuario desconocido";

  $postElement.innerHTML = `
    <div class="contenedor-usuario">
      <img src="/imagenes/nik.png" alt="" class="foto-usuario" />
      <p>${userName}</p>
    </div>
    <h2>${title}</h2>
    <p>${description}</p>
    <div class="contenedor-botones-post">
      <div>
        <button class="btn-subir">
          <img src="/imagenes/up-botton-blue.png" alt="" />
        </button>
        <span class="contador-subir">${contadorSubir}</span>
        <button class="btn-bajar">
          <img src="/imagenes/down-botton-white.png" alt="" />
        </button>
        <button class="btn-comentar">
          <img src="/imagenes/comentarios.png" alt="" />
        </button>
      </div>
      <div class="info-post">
      </div>
    </div>
  `;

  // Delegación de eventos
  $postElement.addEventListener("click", (e) => {
    const $target = e.target.closest("button");
    if (!$target) return;

    if ($target.classList.contains("btn-subir")) {
      contadorSubir = updateCounter($postElement, contadorSubir, 1);
    } else if ($target.classList.contains("btn-bajar")) {
      contadorSubir = updateCounter($postElement, contadorSubir, -1);
    } else if ($target.classList.contains("btn-comentar")) {
      comentariosHTML(questionId, title, description);
    }
  });

  return $postElement;
}

function updateCounter($postElement, counter, increment) {
  const newCounter = Math.max(0, counter + increment);
  const $contadorSubir = $postElement.querySelector(".contador-subir");
  $contadorSubir.textContent = newCounter;

  const $btnSubir = $postElement.querySelector(".btn-subir");
  $btnSubir.disabled = newCounter > 0;

  return newCounter;
}

async function showPosts() {
  const posts = await getPosts();
  if (!posts) return;
  renderPosts(posts);

  const answers = await responseToQuestion(4);
  console.log(answers);
}
document.addEventListener("DOMContentLoaded", showPosts);

// function comentariosHTML(questionId, title, description) {
//   // Lógica para abrir el modal de comentarios
//   console.log("Abrir modal de comentarios", { questionId, title, description });
// }


// function showPosts() {
//   getPosts().then((posts) => {
//     console.log(posts);
//     const $usersPostContainer = document.getElementById("user-post");
//     const $fragment = document.createDocumentFragment();

//     posts.forEach(({ id: questionId, title, description }, index) => {
//       let contadorSubir = 0; // Inicializar contador de votos positivos
//       // <p>${users.name}</p>
//       // <p>${fecha}</p>

//       const $postElement = document.createElement("article");
//       $postElement.innerHTML = `
//       <div class="contenedor-usuario">
//       <img src="/imagenes/nik.png" alt="" class="foto-usuario" />
//       </div>
//       <h2>${title}</h2>
//       <p>${description}</p>
//       <div class="contenedor-botones-post">
//         <div>
//           <button id="btn-subir">
//             <img src="/imagenes/up-botton-blue.png" alt="" />
//           </button>
//           <span id="contador-subir">${contadorSubir}</span> <!-- Contador de subir -->
//           <button id="btn-bajar">
//             <img src="/imagenes/down-botton-white.png" alt="" />
//           </button>
//           <button id="btn-comentar">
//             <img src="/imagenes/comentarios.png" alt="" />
//           </button>
//         </div>
//         <div class="info-post">
//         </div>
//         </div>
//         `;
//       // <p>${hora}</p>
//       // <p class="categoria">${category.name}</p>

//       // Incrementar contador de votos al hacer clic en el botón de subir
//       const $btnSubir = $postElement.querySelector("#btn-subir");
//       $btnSubir.addEventListener("click", () => {
//         if (contadorSubir === 0) {
//           contadorSubir++;
//           const $contadorSubir = $postElement.querySelector("#contador-subir");
//           $contadorSubir.textContent = contadorSubir;

//           // Deshabilitar el botón de subir después de incrementar el contador
//           $btnSubir.disabled = true;
//         }
//       });

//       // Decrementar el contador de subir al hacer clic en el botón de bajar
//       const $btnBajar = $postElement.querySelector("#btn-bajar");
//       $btnBajar.addEventListener("click", () => {
//         if (contadorSubir > 0) {
//           contadorSubir--;
//           const $contadorSubir = $postElement.querySelector("#contador-subir");
//           $contadorSubir.textContent = contadorSubir;

//           // Habilitar el botón de subir cuando se presiona el botón de bajar
//           $btnSubir.disabled = false;
//         }
//       });

//       // Event listener para abrir el modal de comentarios
//       const $btnComentar = $postElement.querySelector("#btn-comentar");
//       $btnComentar.addEventListener("click", (e) => {
//         comentariosHTML(questionId, title, description); // Pasar el título como argumento
//       });

//       $fragment.appendChild($postElement);
//     });

//     $usersPostContainer.appendChild($fragment);
//   });
// }
// document.addEventListener("DOMContentLoaded", showPosts);
