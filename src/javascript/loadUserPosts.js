// TODO: refresh feature to when adding a new post, it re-renders the content or refreshes
import { getPosts } from "../services/supabase/posts.js";
// import { responseToQuestion } from "../services/supabase/answers.js";  // used for testing the functyionality
import { handleQuestionClick } from "./handler/questionClick.js";  // check if is needed to refactor in events
import { comentariosHTML } from "./modal-comentarios.js";
import { formatDate } from "./helpers/obtener-tiempo.js";

import { userLogged } from "../services/supabase/auth.js" //

/**
 * Renders a list of posts by creating and appending post elements to a container.
 * @param {Array} posts - An array of post objects.
 */
function renderPosts(posts) {
  const $usersPostContainer = document.getElementById("user-post"),
    $fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const $postElement = createPostElement(post);
    $fragment.appendChild($postElement);
  });

  $usersPostContainer.appendChild($fragment);
}

/**
 * Creates a post element with user information, title, description, and buttons.
 * @param {Object} post - Post data including id, title, description, users, and date.
 * @returns {HTMLElement} - The created post element.
 */
function createPostElement({ id: questionId, title, description, users, date }) {
  const $postElement = document.createElement("article");

  const userName = users?.name || "Usuario desconocido";
  const emailUser = users?.email || "Correo desconocido";
  let contadorSubir = 0;

  $postElement.innerHTML = `
    <div class="contenedor-usuario">
      <div class="profile-icon">
        <img class="foto-usuario" src="/imagenes/nik.png" alt="" />
        <div class="profile-metadata">
          <span>${userName}</span>
          <span>${emailUser}</span>
        </div>
      </div>
      <div class="fecha-publicacion">${formatDate(date)}</div>
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
      <div class="info-post"></div>
    </div>
  `;

  // Event delegation
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

/**
 * Updates the counter display and button state.
 * @param {HTMLElement} $postElement - The post element containing the counter and buttons.
 * @param {number} counter - The current counter value.
 * @param {number} increment - The amount to increment the counter.
 * @returns {number} - The updated counter value.
 */
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

  // Test fetching the answers for a question (uncomment if needed)
  // const answers = await responseToQuestion(4);
  // console.log(answers);

  // Test getting user metadata (uncomment if needed)
  // try {
  //   const metaData = await userLogged();
  //   console.log("User metadata:", metaData);
  // } catch (error) {
  //   console.error("Error fetching user metadata:", error);
  // }
}
document.addEventListener("DOMContentLoaded", showPosts);
