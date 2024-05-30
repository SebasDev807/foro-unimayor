import supabase from "./supabaseClient";

async function incrementCounter(questionId) {
  try {
    // Obtener el contador de "likes" actual
    const { data: currentData, error: fetchError } = await supabase
      .from("questions")
      .select("likes")
      .eq("id", questionId);

    if (fetchError) throw new Error("Error fetching data");

    // Incrementar el contador de "likes"
    const { data: updateData, error: updateError } = await supabase
      .from("questions")
      .update({
        likes: currentData[0].likes + 1
      })
      .eq("id", questionId);

    if (updateError) throw new Error("Error incrementing counter");

    return updateData;
  } catch (error) {
    console.error("Error incrementing counter:", error.message);

    return null;
  }
}

async function decrementCounter(questionId) {
  try {
    // Obtener el contador de "likes" actual
    const { data: currentData, error: fetchError } = await supabase
      .from("questions")
      .select("likes")
      .eq("id", questionId);

    if (fetchError) throw new Error("Error fetching data");

    // Verificar si los "likes" son mayores que 0 antes de decrementar
    if (currentData[0].likes > 0) {
      // Decrementar el contador de "likes"
      const { data: updateData, error: updateError } = await supabase
        .from("questions")
        .update({
          likes: currentData[0].likes - 1
        })
        .eq("id", questionId);

      if (updateError) throw new Error("Error decrementing counter");

      return updateData;
    } else {
      console.log("No se puede decrementar. Los 'likes' ya son 0.");
      return null;
    }
  } catch (error) {
    console.error("Error decrementing counter:", error.message);

    return null;
  }
}


export { incrementCounter, decrementCounter };