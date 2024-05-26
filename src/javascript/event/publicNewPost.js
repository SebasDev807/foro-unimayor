import { createPost } from "../../services/supabase/posts.js";
import { dateTimeISO8601 } from "../helpers/obtener-tiempo.js";

const $publicPostButton = document.getElementById('public-answer');

/**
 * Handles the submission of a public post (question) form.
 * This function is triggered when the user clicks the submit button.
 * It collects the input values (title and description) from the form,
 * constructs a new question object, and calls the createPost function to
 * insert the question into the database.
 *
 * @param {Event} event - The form submission event.
 */
function managePublicPostButton(event) {
  event.preventDefault();
  const title = document.getElementById('titulo-pregunta').value;
  const description = document.getElementById('cuerpo-pregunta').value;
  console.log(title, description);
  const newQuestion = {
    id_user: 1, // modific to get the user id from the session(supabase auth)
    title,
    description,
    id_category: 1,
    // IMPOTANT - likes initialized to zero in database, doesn't need to be set
    date: dateTimeISO8601(),
  };

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
