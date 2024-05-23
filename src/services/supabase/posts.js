import supabase from "./supabaseClient";
/**
 * Asynchronously fetches the posts from a database.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of posts if they exist, an empty array if no posts exist, or null if an error occurs.
 */
async function getPosts() {
  try {
    const { data: userQuestion, error } = await supabase
      .from("questions")
      .select(`id, title, description`);
    // console.log(userQuestion);
    if (error) throw new Error("Error fetching data");

    return userQuestion;
  } catch (error) {
    console.error("Error fetching posts:", error.message);

    return null;
  }
}

function insertCategory() {
  const characterIntCategory = prompt(
    "Insert the category -> 1 para fisica,  2 para Matemática"
  );
  return characterIntCategory === "1" ? "fisica" : "matematica";
}

/**
 * Asynchronously creates a new post in a database.
 *
 * @param {Object} post - The post to be created.
 * @param {number} userId - The ID of the user who created the post.
 * @returns {Promise<Object>} - A promise that resolves to the created post if successful, or null if an error occurs.
 */

async function createPost(post) {
  const client = supabase; // Assume supabaseClient is already configured
  try {
    // Insertar la pregunta
    const { data: postData, error: postError } = await client
      .from("questions")
      .insert([post]);
    if (postError) {
      console.log(postError);
      //  throw new Error("Error creating post here");
      return;
    }
  } catch (error) {
    console.error("Error creating post:", error.message);
    // En Supabase, no necesitas llamar a rollback_transaction explícitamente
    // porque si ocurre un error en cualquiera de las operaciones, no se aplicarán cambios
    return null;
  }
}

export { getPosts, createPost };
