import { obtenerFecha, obtenerHora } from "../helpers/obtener-tiempo.js";

const contenedorPregunta = document.querySelector("#pregunta");
const ulPosts = document.querySelector("#lista-posts");
let listaPost = [];

cargarEventListeners();

function cargarEventListeners() {
  contenedorPregunta.addEventListener("click", postearPregunta);
}

function postearPregunta(e) {
  if (e.target.classList.contains("boton")) {
    const post = e.target.parentElement.previousElementSibling.children[1];
    leerDatos(post);

    // Reiniciar los campos de entrada a su estado original (vacío)
   const input = post.querySelector("input");
   const textarea = post.querySelector("textarea");
   const post.querySelector("textarea").style.height = "";
  }
}

function leerDatos(post) {
  const infoPost = {
    imagen: "",
    titulo: post.querySelector("input").value,
    cuerpo: post.querySelector("textarea").value,
    hora: obtenerHora(),
    fecha: obtenerFecha(),
  };
  listaPost = [...listaPost, infoPost];
  console.log(listaPost);
  postPreguntaHTML();
}

function postPreguntaHTML() {
  limpiarLista();
  listaPost.forEach((post) => {
    const { titulo, cuerpo, fecha, hora } = post;
    const contenedorPost = document.createElement("article");
    contenedorPost.classList.add("contenedor-post");
    contenedorPost.innerHTML = `
        <div class="contenedor-usuario">
            <p>NekitoKawaii87</p>
            <p>SempaiMaster</p>
            <p>${fecha}</p>        
        </div>
        <h2>${titulo}</h2>
        <p>${cuerpo}</p>
        <div class="contenedor-botones-post">
            <button class="btn-subir">sube</button>
            <button class="btn-bajar">baja</button>
            <button class="btn-comentar">comenta</button>
            <p>Emprendimiento</p>
            <p>${hora}</p>
        </div>
    `;
    ulPosts.insertBefore(contenedorPost, ulPosts.firstElementChild);
  });
}

function limpiarLista() {
  while (ulPosts.firstChild) {
    ulPosts.removeChild(ulPosts.firstChild);
  }
}
