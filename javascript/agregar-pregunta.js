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

  let contenedorBotonesPost = document.createElement("div");

  fotoDePerfil.src = "/imagenes/leonpregunta.png";
  nombreUsuario.textContent = "NekitoKawaii";
  hashTag.textContent = "#SempaiMaster";

  pregunta.textContent = inputPregunta.value;

  contenedorElementosUsuarios.classList.add("contenedor-usuario");
  elemento.classList.add("pregunta-post");
  articulo.classList.add("contenedor-post");

  contenedorElementosUsuarios.appendChild(fotoDePerfil);
  contenedorElementosUsuarios.appendChild(nombreUsuario);
  contenedorElementosUsuarios.appendChild(hashTag);

  articulo.appendChild(contenedorElementosUsuarios);
  articulo.appendChild(pregunta);
  elemento.appendChild(articulo);
  listaPreguntas.append(elemento);
});
