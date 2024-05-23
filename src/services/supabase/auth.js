import supabase from "./supabaseClient";

export async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173/src/html/pagina-principal.html",
    },
  });
  console.log(data, error);
}

export async function saveUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error al obtener datos de usuario:", error);
    return;
  }

  if (user.email.endsWith("@unimayor.edu.co")) {
    const respuesta = await supabase.from("users").insert([
      {
        name: user.user_metadata.name,
        email: user.email,
        password: "",
      },
    ]);
    if (respuesta.error) {
      console.error("Error al insertar datos ", respuesta.error);
    } else {
      console.log("Datos insertados");
    }
  } else {
    logout();
  }
}

export async function logout() {
  console.log("Cerrando sesion");
  const { error } = await supabase.auth.signOut();
  window.location.replace("http://localhost:5173/src/html/login.html");
}

export async function userLogged() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return user;
}