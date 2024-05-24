import { createPost } from "../../services/supabase/posts.js";

const $publicPostButton = document.getElementById('public-answer');
function managePublicPostButton(event) {
  event.preventDefault();
  const title = document.getElementById('titulo-pregunta').value;
  const description = document.getElementById('cuerpo-pregunta').value;
  console.log(title, description);
  const newQuestion = {
    title,
    description,
    id_category: 1,
    id_user: 1
  };

  const userId = 1; // Asumiendo un usuario fijo para el ejemplo

  console.log("new public");
  createPost(newQuestion);
    // .then(createdQuestion => {
    //   console.log('Pregunta creada:', createdQuestion);
    // })
    // .catch(error => {
    //   console.error('Error al crear la pregunta:', error);
    // });
}

$publicPostButton.addEventListener('click', managePublicPostButton);


