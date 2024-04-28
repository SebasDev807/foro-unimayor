import supabase from "./supabaseClient";

//(async () => {
//  const { data, error } = await supabase
//    .from("answers")
//    .select("*")
//    .eq("id_question", 1); // Assuming "id_question" is the foreign key field name

//  if (error) {
//    throw new Error(error.message);
//  }

// return data;
//  console.log("answers :", data);
//})();

async function responseToQuestion(questionId) {
  try {
    const { data, error } = await supabase
      .from("answers")
      .select("*")
      .eq("id_question", questionId); // Assuming "id_question" is the foreign key field name

    if (data) return []; // Return an empty array if there are no answers

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);

    return null;
  }
}

export { responseToQuestion };
