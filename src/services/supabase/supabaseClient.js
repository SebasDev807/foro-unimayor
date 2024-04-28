import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  const { data: userQuestion, error } = await supabase.from("user_questions")
    .select(`
      users(id, name),
      questions(title, description, category(name))
    `);

  if (error) console.log("Error: ", error);
  else console.log("Data: ", userQuestion);
})();


async function usersInfo() {
  const { data, error } = await supabase.from("users");
  return { data, error };
}

export default supabase;
export { usersInfo };