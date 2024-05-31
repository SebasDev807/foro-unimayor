// TODO: refresh feature to when adding a new post, it re-renders the content or refreshes
import { getPosts, removeQuestion } from "../services/supabase/posts.js";
import { incrementCounter, decrementCounter } from "../services/supabase/likes.js";
import { handleQuestionClick } from "./handler/questionClick.js";  // check if is needed to refactor in events
import { comentariosHTML } from "./modal-comentarios.js";
import { formatDate } from "./helpers/obtener-tiempo.js";
import { responseToQuestion, deleteAnswerToAQuestion } from "../services/supabase/answers.js";
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
function createPostElement({ id: questionId, title, description, users, date, likes }, index) {
  const $postElement = document.createElement("article");

  const userName = users?.name || "Usuario desconocido";
  const emailUser = users?.email || "Correo desconocido";
  const imgUserGoogle = users?.imgUserGoogle;
  const formatedDate = formatDate(date) || "Fecha desconocida";
  let contadorSubir = likes;

  const imgSrc = imgUserGoogle ? `src="${imgUserGoogle}"` : "";

  $postElement.innerHTML = `
    <div class="contenedor-usuario">
      <div class="profile-icon">
        <img class="foto-usuario" ${imgSrc} alt="" />
        <div class="profile-metadata">
          <span>${userName}</span>
          <span>${emailUser}</span>
        </div>
      </div>
      <div class="fecha-publicacion">${formatedDate}</div>
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

  $postElement.addEventListener("click", async (e) => {
    const $target = e.target.closest("button");
    if (!$target) return;

    if ($target.classList.contains("btn-subir")) {
      incrementCounter(questionId, "questions"); // supabase function
      contadorSubir = updateCounter($postElement, contadorSubir, 1);
    } else if ($target.classList.contains("btn-bajar")) {
      decrementCounter(questionId, "questions"); // supabase function
      contadorSubir = updateCounter($postElement, contadorSubir, -1);
    } else if ($target.classList.contains("btn-comentar")) {
      await comentariosHTML(questionId, title, description, userName, emailUser, formatedDate); // draw the modal with the question and answers
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
}
document.addEventListener("DOMContentLoaded", showPosts);
