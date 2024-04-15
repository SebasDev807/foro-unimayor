import supabase from './supabaseClient.js'

async function usersInfo() {
  try {
    return { data } = await supabase.from("users").select("*");
  } catch (error) {
    if (error.response) {
      console.error("Error de respuesta HTTP:", error.response.status);
    } else if (error.request) {
      console.error("Error de solicitud sin respuesta:", error.request);
    } else {
      console.error("Error desconocido:", error.message);
    }

    return null;
  }
}

export { usersInfo };
