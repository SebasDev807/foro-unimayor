import supabase from "../../services/supabase/supabaseClient.js"
import { userLogged } from "../../services/supabase/auth.js"
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
async function managePublicPostButton(event) {
  event.preventDefault();
  const title = document.getElementById('titulo-pregunta').value;
  const description = document.getElementById('cuerpo-pregunta').value;

  let metaDataUserAuth,
    relationshipUserEmail = null;

  // 1) get authenticated user metadata
  try {
    metaDataUserAuth = await userLogged();
  } catch (error) {
    console.error("Error al obtener los metadatos del usuario:", error);
  }
  // 2) get id user then mack with his email in table (users)
  try {
    // Perform a query to the (users) table where the email matches the one provided
    const { data: users, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", metaDataUserAuth.email)
      .single(); // Espera solo un resultado

    // if there is an error getting the data, throw an exception
    if (error) throw new Error("Error al obtener los datos");

    // if no user is found, returns null
    if (!users) return null;

    // return users.id;
    relationshipUserEmail = users;
  } catch (error) {
    // Registra el mensaje de error y devuelve null
    console.error("Error al obtener el ID del usuario:", error.message);
    return null;
  }

  // model the obtained data as the user id in the users table.To manage the linking of tables correctly
  const newQuestion = {
    id_user: relationshipUserEmail.id,
    title,
    description,
    id_category: 1, // Modify as needed
    date: dateTimeISO8601(),
  };

  createPost(newQuestion)
    .then(createdQuestion => {
      alert('Question created:', createdQuestion);
    })
    .catch(error => {
      alert('Error creating the question:', error);
    });
}
$publicPostButton.addEventListener('click', managePublicPostButton);
