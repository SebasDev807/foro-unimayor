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

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw new Error('Error al cerrar sesión')
    }

    console.log('Sesión cerrada correctamente')
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message)
  }
}

export async function saveUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();  // TODO: Don't works correctly

  console.log(user);
  // console.log(user);

  if (error) {
    console.error("Error al obtener datos de usuario:", error);
    return;
  }
  // console.log(user);
  console.log(typeof user.id);
  const respuesta = await supabase
    .from("users")
    .insert([
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
}
