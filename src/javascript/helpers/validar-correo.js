const botonValidar = document.getElementById("boton");
let textoCorreo = document.getElementById("texto-email");

botonValidar.addEventListener("click", (event) => {
  let correo = textoCorreo.value.trim();

  if (!correo.endsWith("@unimayor.edu.co")) {
    alert("Solo unimayor lokas");
    event.preventDefault();
  }
});
