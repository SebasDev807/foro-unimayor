import { responseToQuestion } from "../../services/supabase/answers";

/**
 * Asynchronously fetches the response to a question from a database.
 *
 * @param {Event} event - The ID of the question for which the response is to be fetched.
 * @returns {void} - A promise that resolves to an array of responses if they exist, an empty array if no responses exist, or null if an error occurs.
 */
function handleQuestionClick(id) {
  responseToQuestion(id).then((answers) => {
    return answers;
  });

}

export { handleQuestionClick };