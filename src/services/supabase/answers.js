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
      .select("description")
      .eq("id_question", questionId);

    // If there's an error in fetching the data, throw an error
    if (error) throw new Error("Error fetching data");

    // If no responses exist, return an empty array
    if (!response || response.length === 0) return [];

    // Return the fetched responses
    return response;
  } catch (error) {
    // Log the error message and return null
    console.error("Error fetching posts:", error.message);
    return null;
  }
}

export { responseToQuestion };
