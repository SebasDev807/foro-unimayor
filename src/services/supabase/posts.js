import supabase from "./supabaseClient";

async function getPosts() {
  try {
    const { data: userQuestion, error } = await supabase.from("user_questions")
      .select(`
        users(id, name),
        questions(title, description, category(name))
      `);

    if (error) {
      throw new Error("Error fetching data");
    }

    return userQuestion;
  } catch (error) {
    console.error("Error fetching posts:", error.message);

    return null;
  }
}

export { getPosts };
