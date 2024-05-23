import supabase from "./supabaseClient";

const $btnPost = document.querySelector("#public-answer");

$btnPost.addEventListener("click", createPost);

async function  createPost(userId = 1) {
  try {
     const { data: postData, error: postError } =  await supabase
       .from('questions')
       .insert([{title: "hola", description: "holaaa", id_category: 1}]);
     if (postError) {
      console.log(postError);
      return;
     }
 
     const userPost = {
       id_user: userId,
       id_question: postData[0].id
     };
     const { data: userPostData, error: userPostError } = await client
       .from('user_questions')
       .insert([userPost]);
 
     if (userPostError) {
       throw new Error("Error creating user-post association");
     }
     return postData;
  } catch (error) {
     console.error("Error creating post:", error.message);
     return null;
  }
 }