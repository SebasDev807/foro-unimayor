import supabase from "../../services/supabase/supabaseClient";

async function showThread(questionId) {
  try {
    const { data: thread, error } = await supabase.from("threads")
      .select(`
        question(title),
        answers(content, user(name))
      `)
      .eq('question_id', questionId);

    if (error) {
      throw new Error("Error fetching thread");
    }

    displayThread(thread);
  } catch (error) {
    console.error("Error fetching thread:", error.message);
  }
}

export { showThread };