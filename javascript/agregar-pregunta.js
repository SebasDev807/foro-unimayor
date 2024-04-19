/**
 * TODO: Hay que actualizar el codigo
 *
 * Me di cuenta que como despues se va a hacer
 * el UPDATE de los posts es necesario meter los
 * parrafos dentro de un textArea, aueda pendiente.
 *
 * */
import { PostComponent } from "./components/post.js";

document.addEventListener("DOMContentLoaded", () => {
  const listaPreguntas = document.querySelector(".lista-posts");
  const inputTitulo = document.querySelector(".titulo-pregunta");
  const inputCuerpo = document.querySelector(".cuerpo-pregunta");
  const botonPublicar = document.querySelector('.boton');

  botonPublicar.addEventListener("click", () => {
    listaPreguntas.insertBefore(PostComponent("/imagenes/leon-foto-perfil.png", "NekitoKawai", "#SempaiMaster"), listaPreguntas.firstChild);
    inputTitulo.value = "";
    inputCuerpo.value = "";
    inputCuerpo.style.height = "";
    
  });
});