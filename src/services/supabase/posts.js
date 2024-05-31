// TODO: Implement the functions to insert correct question categorie
import supabase from "./supabaseClient";
import { userLogged, } from "./auth";
import { dateTimeISO8601 } from "../../javascript/helpers/obtener-tiempo.js";

/**
 * Inserts a category based on user input.
 * @returns {string} The inserted category ("fisica" or "matematica").
 */
function insertCategory() {
  const characterIntCategory = prompt(
    "Insert the category -> 1 para fisica,  2 para Matemática"
  );
  return characterIntCategory === "1" ? "fisica" : "matematica";
}

/**
 * Asynchronously fetches the posts from a database.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of posts if they exist, an empty array if no posts exist, or null if an error occurs.
 */
async function getPosts() {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select(`
      *,
      users(id, name, email, imgUserGoogle)
    `)
      .order('id', { ascending: false });
    // console.log("data: ", data)


    if (error) throw new Error("Error fetching data");

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);

    return null;
  }
}

export async function deleteResponseToQuestion(id) {
  const { error } = await supabase
    .from('answers')
    .delete()
    .eq('id', id);
  return { error };
}

/**
 * Retrieves posts by the logged-in user.
 * @returns {Promise<Array>} An array of post data.
 */
async function getPostByUser() {
  try {
    const { email } = await userLogged();
    const { data: userData } = await supabase
      .from('users')
      .select(`id`)
      .eq('email', email);
    console.log("here: ", userData[0].id)
    const id = userData[0].id;

    const { data, error } = await supabase
      .from('questions')
      .select(`
      *,
      answers(id, description)
    `)
      .eq('id_user', id);
    return data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Asynchronously creates a new post in a database.
 *
 * @param {Object} post - The post to be created.
 * @returns {Promise<Object>} - A promise that resolves to the created post if successful, or null if an error occurs.
 */
async function createPost(post) {
  try {
    const { data: postData, error: postError } = await supabase
      .from("questions")
      .insert([post]);

    return true
  } catch (error) {
    console.error("Error creating post:", error.message);
    // En Supabase, no necesitas llamar a rollback_transaction explícitamente
    // porque si ocurre un error en cualquiera de las operaciones, no se aplicarán cambios
    return null;
  }
}

/**
 * Responds to a question by adding an answer to the database.
 * @param {string} comentario - The comment for the answer.
 * @param {string} titulo - The title of the question.
 * @param {string} descripcion - The description of the question.
 * @returns {Promise<void>} - A promise that resolves when the answer is added successfully, or rejects with an error.
 */
const createResponseToQuestion = async (comentario, titulo, descripcion, idAuthUser) => {
  const posts = await getPosts();
  const findQuestion = posts.filter(post =>
    descripcion.trim() === post.description.trim() && titulo.trim() === post.title.trim()
  );

  try {
    if (findQuestion.length === 0) return;

    const { id } = findQuestion[0];

    const userQuestion = {
      id_question: id,
      description: comentario,
      id_user: idAuthUser,
      created_at: dateTimeISO8601(),
    };

    const { data: postResponse, error: postError } = await supabase
      .from("answers")
      .insert([userQuestion]);

    if (postError) {
      console.error(postError);
      return;
    }
  } catch (error) {
    console.error("Error creating post:", error.message);
    return null;
  }
};

/**
 * Removes a question from the database.
 * @param {string} idQuestion - The ID of the question to be removed.
 * @returns {Promise<Object|null>} - A promise that resolves to the deleted question data, or null if there was an error.
 */
async function /*removePost*/ removeQuestion(idQuestion) {
  try {
    const { data, error } = await supabase
      .from('questions')
      .delete()
      .eq('id', idQuestion);

    if (error) {
      console.error("Error deleting question:", error);
      return null;
    }

    alert("Question deleted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error deleting question:", error.message);
    return null;
  }
}

export { getPosts, createPost, getPostByUser, createResponseToQuestion, removeQuestion };
