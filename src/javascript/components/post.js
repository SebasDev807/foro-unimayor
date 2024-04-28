import { obtenerFecha, obtenerHora } from "../helpers/obtener-tiempo.js";
import { renderizarComentarios } from "./comentario.js";
const contenedorPregunta = document.querySelector("#pregunta");
const ulPosts = document.querySelector("#lista-posts");

let listaPost = [];

cargarEventListeners();

function cargarEventListeners() {
  contenedorPregunta.addEventListener("click", postearPregunta);
  
}

function postearPregunta(e) {
  if (e.target.classList.contains("boton")) {
    const post = e.target.parentElement.previousElementSibling;
    const input = post.querySelector("input");
    const cuerpo = post.querySelector("textarea");

    if (input.value === "" || cuerpo.value === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const infoPost = obtenerInfoPost(post);
    listaPost.push(infoPost);
    limpiarInput(input, cuerpo);
    renderizarPost(infoPost);
    renderizarComentarios();
  }
}

function obtenerInfoPost(post) {
  return {
    imagen: "",
    titulo: post.querySelector("input").value,
    cuerpo: post.querySelector("textarea").value,
    hora: obtenerHora(),
    fecha: obtenerFecha(),
  };
}

function limpiarInput(input, cuerpo) {
  input.value = "";
  cuerpo.value = "";
}

function renderizarPost(post) {
  const { titulo, cuerpo, fecha, hora } = post;
  const contenedorPost = document.createElement("article");
  contenedorPost.classList.add("contenedor-post");
  contenedorPost.innerHTML = `
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
  ulPosts.insertBefore(contenedorPost, ulPosts.firstElementChild);
}

export const PostComponent = {
  cargarEventListeners,
  postearPregunta,
  renderizarPost
}

