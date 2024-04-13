/**
 * TODO: Hay que actualizar el codigo 
 * Se agregaron dos elementos nuevos en la
 * seccion de pregunta,  por lo que varios
 * elementos declarados aquí quedaron inutilizables
 * se debe actualizar la función para adaptarse a los
 * cambios, buenas noches :D..
 * 
 * */ 



import { obtenerHora, obtenerFecha } from "./helpers/obtener-tiempo.js";

console.log(obtenerHora());

const listaPreguntas = document.querySelector(".lista-posts");
const botonPublicar = document.querySelector(".boton");
const inputPregunta = document.querySelector(".input-pregunta");

botonPublicar.addEventListener("click", () => {
  // Creación de elementos
  let elemento = document.createElement("li");
  let articulo = document.createElement("article");
  let pregunta = document.createElement("p");

  let contenedorElementosUsuarios = document.createElement("div");
  let fotoDePerfil = document.createElement("img");
  let nombreUsuario = document.createElement("p");
  let hashTag = document.createElement("p");
  let horas = document.createElement("p");
  let fecha = document.createElement("p");

  const contenedorBotonesPost = document.createElement("div");
  const botonSubir = document.createElement("button");
  const botonBajar = document.createElement("button");
  const botonComentar = document.createElement("button");
  let seccion = document.createElement("p");

  // Configuración de los elementos
  botonSubir.textContent = "sube";
  botonBajar.textContent = "baja";
  botonComentar.textContent = "comenta";
  seccion.textContent = "Emprendimiento";

  fotoDePerfil.src = "/imagenes/leonpregunta.png";
  nombreUsuario.textContent = "NekitoKawai";
  hashTag.textContent = "#SempaiMaster";
  horas.textContent = obtenerHora();
  pregunta.textContent = inputPregunta.value;
  horas.textContent = obtenerHora();
  fecha.textContent = obtenerFecha();

  // Asignación de clases
  contenedorBotonesPost.classList.add("contenedor-botones-post");
  botonSubir.classList.add("btn-subir");
  botonBajar.classList.add("btn-bajar");
  botonComentar.classList.add("btn-comentar");
  contenedorElementosUsuarios.classList.add("contenedor-usuario");
  elemento.classList.add("pregunta-post");
  articulo.classList.add("contenedor-post");

  // Estructura del DOM
  contenedorBotonesPost.appendChild(botonSubir);
  contenedorBotonesPost.appendChild(botonBajar);
  contenedorBotonesPost.appendChild(botonComentar);
  contenedorBotonesPost.appendChild(seccion);
  contenedorBotonesPost.appendChild(horas);

  contenedorElementosUsuarios.appendChild(fotoDePerfil);
  contenedorElementosUsuarios.appendChild(nombreUsuario);
  contenedorElementosUsuarios.appendChild(hashTag);
  contenedorElementosUsuarios.appendChild(fecha);

  articulo.appendChild(contenedorElementosUsuarios);
  articulo.appendChild(pregunta);
  articulo.appendChild(contenedorBotonesPost);

  elemento.appendChild(articulo);
  listaPreguntas.insertBefore(elemento, listaPreguntas.firstChild);

  inputPregunta.value = "";
});
