import { userLogged } from "../../services/supabase/auth.js";
import { createPost } from "../../services/supabase/posts.js";
import supabase from "../../services/supabase/supabaseClient.js";

const $publicPostButton = document.getElementById("public-answer");

export async function managePublicPostButton(event) {
  event.preventDefault();
  const { email } = await userLogged();
  const { data: userData } = await supabase
    .from("users")
    .select(`id`)
    .eq("email", email);
  const id = userData[0].id;

  const title = document.querySelector("#user-post > article > h2").innerText;
  const description = document.querySelector("#user-post > article > p").innerText;
  // const title = document.getElementById("titulo-pregunta").value;
  // const description = document.getElementById("cuerpo-pregunta").value;
  console.log(title, description);
  const newQuestion = {
    title,
    description,
    id_category: 1,
    id_user: id,
  };

  console.log("new public");
  await createPost(newQuestion);
  // .then(createdQuestion => {
  //   console.log('Pregunta creada:', createdQuestion);
  // })
  // .catch(error => {
  //   console.error('Error al crear la pregunta:', error);
  // });
}

$publicPostButton.addEventListener("click", managePublicPostButton);
