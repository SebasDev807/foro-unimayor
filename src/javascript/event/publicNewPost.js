import { createPost } from "../../services/supabase/posts.js";

// Obtener referencia al botón de publicar
const $publicPostButton = document.getElementById('public-answer');

// Manejador del evento de clic en el botón de publicar
function managePublicPostButton(event) {
  // Prevenir el comportamiento por defecto del formulario, si es necesario
  event.preventDefault();

  // Tomar los valores de los inputs
  const title = document.getElementById('input-title').value;
  const description = document.getElementById('input-description').value;

  // Crear un objeto de pregunta con los valores de los inputs
  const newQuestion = {
    title,
    description,
    // Aquí debes definir 'url_img' si lo necesitas y el 'id_category' correspondiente
    // Ejemplo: url_img: '/path/to/image.jpg', id_category: 1
  };

  // ID del usuario que está creando la pregunta
  // Este valor debería obtenerse de tu sistema de autenticación
  const userId = 1; // Asumiendo un usuario fijo para el ejemplo

  // Enviar los valores al servidor para crear el post
  createPost(newQuestion, userId)
    .then(createdQuestion => {
      console.log('Pregunta creada:', createdQuestion);
      // Actualizar la interfaz de usuario para mostrar la nueva pregunta
      // Por ejemplo, podrías agregar la pregunta a un listado de preguntas visible
    })
    .catch(error => {
      console.error('Error al crear la pregunta:', error);
    });
}

// Asignar el manejador de eventos al botón de publicar
$publicPostButton.addEventListener('click', managePublicPostButton);


// import { createNew } from "../../services/supabase/posts.js";

// /* 1) manejar evento que usuario oprimio boton publicar
//    2) tomar los valores de los inputs
//    3) enviar los valores al servidor
//    4) mostrar actualizacion de respuestas a un post
//  */
// const $publicPostButton = document.getElementById('public-answer');

// // // 2
// // function extractPostData() {
// //   const title = document.getElementById('titulo-pregunta').value;
// //   const description = document.getElementById('cuerpo-pregunta').value;

// //   return { title, description };
// // }

// function managePublicPostButton(event) {
// }
// $publicPostButton.addEventListener('click', managePublicPostButton);

// // function managePublicPostButton(event) {
// //   const { title, description } = extractPostData();

// //   const newQuestion = {
// //     title,
// //     description,
// //     url_img: '/imagenes/pregunta.png',
// //     id_category: 1  // Supongamos que '1' es el ID de la categoría para 'física'
// //   };
// //   console.log("datos para crear la nueva pregunta: ", newQuestion);

// //   const userId = 1;

// //   // Llamar a la función 'createNew' para crear la pregunta
// //   createNew(newQuestion, userId)
// //     .then((createdQuestion) => {
// //       console.log('Pregunta creada correctamente ');
// //     })
// //   // .catch((error) => {
// //   //   console.error('Error al crear la pregunta:', error);
// //   // });
// // }
// // $publicPostButton.addEventListener('click', managePublicPostButton);


