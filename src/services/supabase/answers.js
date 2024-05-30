import supabase from "./supabaseClient";

/**
 * Asynchronously fetches the response to a question from a database.
 *
 * @param {string} questionId - The ID of the question for which the response is to be fetched.
 * @returns {Promise<Array>} - A promise that resolves to an array of responses if they exist, an empty array if no responses exist, or null if an error occurs.
 */
async function responseToQuestion(questionId) {
  try {
    // Fetch the response from the 'answers' table in the database where the 'id_question' matches the provided question ID
    const { data: response, error } = await supabase
      .from("answers")
      .select(`
        *,
        user: id_user(id, name, email)
      `)
      .eq("id_question", questionId);

    // Verificar si hay un error en la consulta
    if (error) {
      throw new Error("Error fetching data");
    }

    // Mapear los datos de respuesta para incluir el nombre del usuario
    const responsesWithUser = response.map((res) => {
      const user = res.user;
      return {
        id: res.id,
        id_question: res.id_question,
        description: res.description,
        id_user: user.id,
        user_name: user.name,
        user_email: user.email,
        created_at: res.created_at,
        likes: res.likes,
      };
    });

    // Devolver las respuestas con el nombre del usuario
    return responsesWithUser;
  } catch (error) {
    // Log the error message and return null
    console.error("Error fetching posts:", error.message);
    return null;
  }
}

/**
 * Deletes an answer to a question from the 'answers' table in Supabase.
 * @param {number} idAnswer - The ID of the answer to be deleted.
 * @returns {Promise<object|null>} - A promise that resolves to the deleted answer data if successful, or null if there was an error.
 */
async function deleteAnswerToAQuestion(idAnswer) {
  try {
    const { data, error } = await supabase
      .from('answers')
      .delete()
      .eq('id', idAnswer)
    // .single();

    if (error) {
      console.error("Error deleting answer:", error);
      return false;
    }

    alert("Answer deleted successfully:", data);
    return true;
  } catch (error) {
    console.error("Error deleting answer:", error.message);
    return false;
  }
}

export { responseToQuestion, deleteAnswerToAQuestion };
