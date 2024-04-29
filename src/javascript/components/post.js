import { obtenerFecha, obtenerHora } from "../helpers/obtener-tiempo.js";
import { comentariosHTML } from "../modal-comentarios.js";

const contenedorPregunta = document.querySelector("#pregunta");
const ulPosts = document.querySelector("#user-post");
const btnPublicar = document.querySelector("#public-answer");
const campoBusqueda = document.querySelector("#input-busqueda");

let listaPost = [];

cargarEventListeners();

function cargarEventListeners() {
  btnPublicar.addEventListener("click", postearPregunta);
  campoBusqueda.addEventListener("input", filtrarPreguntas);
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
  contenedorPost.innerHTML = `
  <div class="contenedor-usuario">
    <img src="/imagenes/nik.png" alt="" class="foto-usuario" />
    <p>Joer</p>
    <p>@$Joer</p>
    <p>${fecha}</p>        
  </div>
  <h2>${titulo}</h2>
  <p>${cuerpo}</p>
  <div class="contenedor-botones-post">
    <div>
      <button id="btn-subir">
        <img src="/imagenes/up-botton-blue.png" alt="" />
      </button>
      <span id="contador-subir">1</span> <!-- Contador de subir -->
      <button id="btn-bajar">
        <img src="/imagenes/down-botton-white.png" alt="" />
      </button>
      <button id="btn-comentar">
        <img src="/imagenes/comentarios.png" alt="" />
      </button>
    </div>
    <div class="info-post">
      <p class="categoria">$Emprendimiento</p>
      <p>${hora}</p>
    </div>
  </div>`;

  const btnComentar = contenedorPost.querySelector("#btn-comentar");
  if (btnComentar) {
    btnComentar.addEventListener("click", function() {
      comentariosHTML(0);
    });
  }

  ulPosts.insertBefore(contenedorPost, ulPosts.firstElementChild);
}

function filtrarPreguntas() {
  const textoBusqueda = campoBusqueda.value.toLowerCase();

  ulPosts.childNodes.forEach(post => {
    const tituloPost = post.querySelector("h2").textContent.toLowerCase();
    if (tituloPost.includes(textoBusqueda)) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

export const PostComponent = {
  cargarEventListeners,
  postearPregunta,
  renderizarPost,
};
