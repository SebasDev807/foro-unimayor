import supabase from "./supabaseClient";
/**
 * Asynchronously fetches the posts from a database.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of posts if they exist, an empty array if no posts exist, or null if an error occurs.
 */
async function getPosts() {
  try {
    const { data: userQuestion, error } = await supabase.from("user_questions")
      .select(`
        users(id, name),
        questions(id, title, description, category(name))
      `);

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
async function createPost(post, userId = 1) {
  const client = supabase; // Assume supabaseClient is already configured

  try {
    await client.rpc("start_transaction");

    const { data: postData, error: postError } = await client
      .from("questions")
      .insert([post]);

    if (postError) {
      throw new Error("Error creating post");
    }

    const userPost = {
      id_user: userId,
      id_question: postData[0].id,
    };

    const { data: userPostData, error: userPostError } = await client
      .from("user_questions")
      .insert([userPost]);

    if (userPostError) {
      throw new Error("Error creating user-post association");
    }

    await client.rpc("commit_transaction");

    return postData;
  } catch (error) {
    console.error("Error creating post:", error.message);
    await client.rpc("rollback_transaction");
    return null;
  }
}

async function getPostByUser(userId) {
  try {
    const { data, error } = await supabase
    .from('questions')
    .select(`
      *,
      answers(id, description)
    `)
    .eq('id_user', userId)
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getPosts, createPost, getPostByUser };
