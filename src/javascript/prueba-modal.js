const boton = document.querySelector(".boton");
const modal = document.querySelector("#caja-comentarios");
const btnCerrar = document.querySelector("#btn-cerrar-comentarios");

boton.addEventListener("click", () => {
  modal.classList.add("caja-comentarios");
  modal.showModal();
});

btnCerrar.addEventListener("click", () => {
    modal.classList.remove("caja-comentarios");
    modal.close();
});
