import { obtenerHora } from "./helpers/obtener-horas.js"

console.log(obtenerHora())
const listaPreguntas = document.querySelector(".lista-posts");
const botonPublicar = document.querySelector(".boton");
const inputPregunta = document.querySelector(".input-pregunta");

botonPublicar.addEventListener("click", () => {
  let elemento = document.createElement("li");
  let articulo = document.createElement("article");
  let pregunta = document.createElement("p");

  let contenedorElementosUsuarios = document.createElement("div");
  let fotoDePerfil = document.createElement("img");
  let nombreUsuario = document.createElement("p");
  let hashTag = document.createElement("p");
  let horas = document.createElement("p");
  let fecha = document.createElement("p");
  horas.textContent = obtenerHora();
  fecha.textContent = obtenerFecha();

  /**
   * 
   * Sección de botones
   */
  const contenedorBotonesPost = document.createElement("div");
  const botonSubir = document.createElement("button");
  const botonBajar = document.createElement("button");
  const botonComentar = document.createElement("button");
  let seccion = document.createElement("p");

  botonSubir.textContent = "sube";
  botonBajar.textContent = "baja";
  botonComentar.textContent = "comenta";
  seccion.textContent = "Emprendimiento";

  contenedorBotonesPost.classList.add("contenedor-botones-post")
  botonSubir.classList.add("btn-subir");
  botonSubir.classList.add("btn-bajar");
  botonSubir.classList.add("btn-comentar");


  contenedorBotonesPost.appendChild(botonSubir);
  contenedorBotonesPost.appendChild(botonBajar);
  contenedorBotonesPost.appendChild(botonComentar);
  contenedorBotonesPost.appendChild(seccion);
  contenedorBotonesPost.appendChild(horas);


  fotoDePerfil.src = "/imagenes/leonpregunta.png";
  nombreUsuario.textContent = "NekitoKawai🐱";
  hashTag.textContent = "#SempaiMaster";
  horas.textContent = obtenerHora();


  pregunta.textContent = inputPregunta.value;

  contenedorElementosUsuarios.classList.add("contenedor-usuario");
  elemento.classList.add("pregunta-post");
  articulo.classList.add("contenedor-post");

  //fecha y hora de la publicación
  // fecha.textContent = new Date().getTime();
  // console.log(new Date().getTime());rq
  // console.log("presionado");

  contenedorElementosUsuarios.appendChild(fotoDePerfil);
  contenedorElementosUsuarios.appendChild(nombreUsuario);
  contenedorElementosUsuarios.appendChild(hashTag);
  contenedorElementosUsuarios.appendChild(hashTag);
  contenedorElementosUsuarios.appendChild(fecha);

  articulo.appendChild(contenedorElementosUsuarios);
  articulo.appendChild(pregunta);
  elemento.appendChild(articulo);
  articulo.appendChild(contenedorBotonesPost);
  listaPreguntas.append(elemento);

});

// function obtenerHora() {
//   let now = new Date();
//   let horas = now.getHours();
//   let minutos = now.getMinutes();
//   let horaFormateada = `${horas} : ${minutos < 10 ? '0' + minutos : minutos}`;
//   return horaFormateada;
// }

function obtenerFecha(){
  let now = new Date();
  let diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  let dia = diasSemana[now.getDay()];
  
  let mes = now.getMonth() + 1;
  let year = now.getFullYear();

  return `${dia}/${mes}/${year}`;
}