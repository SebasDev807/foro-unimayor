import { obtenerFecha, obtenerHora } from "../helpers/obtener-tiempo.js";

const PostComponent = (imgUrl, userName, categoryHashTagt) => {
  const listaPreguntas = document.querySelector(".list-posts");
//   const botonPublicar = document.querySelector(".boton");
  const inputTitulo = document.querySelector(".titulo-pregunta");
  const inputCuerpo = document.querySelector(".cuerpo-pregunta");

  const elemento = document.createElement("li");
  const articulo = document.createElement("article");
  const tituloPregunta = document.createElement("h2");
  const textoCuerpo = document.querySelector("p");

  const contenedorUsuario = document.createElement("div");
  const fotoPerfil = document.createElement("img");
  const nombreUsuario = document.createElement("p");
  const hashTag = document.createElement("p");
  const horas = document.createElement("p");
  const fecha = document.createElement('p');

  const contenedorBotones = document.createElement('div');
  const botonSubir = document.createElement('button');
  const botonBajar = document.createElement('button');
  const botonComentar = document.createElement('button');
  
  const categoria = document.createElement('p');
  
  //configuracion de los elementos
  fotoPerfil.src = imgUrl // "/imagenes/leon-foto-perfil.png";
  nombreUsuario.textContent = userName;
  hashTag.textContent = categoryHashTagt;

  horas.textContent = obtenerHora();
  fecha.textContent = obtenerFecha();



  botonSubir.textContent = "sube";
  botonBajar.textContent = "baja";
  botonComentar.textContent = "comenta";
  categoria.textContent = "Emprendimiento";

  //Asignar clases
  contenedorBotones.classList.add("contenedor-botones-post");
  botonSubir.classList.add("btn-subir");
  botonBajar.classList.add("btn-bajar");
  botonComentar.classList.add("btn-comentar");
  contenedorUsuario.classList.add("contenedor-usuario");
  elemento.classList.add("pregunta-post");
  articulo.classList.add("contenedor-post");

  tituloPregunta.textContent = inputTitulo.value;
  textoCuerpo.textContent = inputCuerpo.value;

  //Agregar al DOM
  contenedorUsuario.appendChild(fotoPerfil);
  contenedorUsuario.appendChild(nombreUsuario);
  contenedorUsuario.appendChild(hashTag);
  contenedorUsuario.appendChild(fecha);


  contenedorBotones.appendChild(botonSubir);
  contenedorBotones.appendChild(botonBajar);
  contenedorBotones.appendChild(botonComentar);
  contenedorBotones.appendChild(categoria);
  contenedorBotones.appendChild(horas);

  articulo.appendChild(contenedorUsuario);
  articulo.appendChild(tituloPregunta);
  articulo.appendChild(textoCuerpo);
  articulo.appendChild(contenedorBotones);

  articulo.appendChild(contenedorUsuario);
  articulo.appendChild(tituloPregunta);
  articulo.appendChild(textoCuerpo);
  articulo.appendChild(contenedorBotones);

  elemento.appendChild(articulo);

  console.log(elemento);
  return elemento;
};

export { PostComponent };