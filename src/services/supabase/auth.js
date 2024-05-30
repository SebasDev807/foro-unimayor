/*
1) login 
2) save user - usuario logeado, si es de la universidad, se guarda en la base de datos de lo contrario se redirige a la pagina de login
3) userLogged - verificar si el usuario esta autenticado con supabase auth
4) logout - cerrar sesion
*/

import supabase from "./supabaseClient";

// export const { user_metadata } = await userLogged()
// console.log(user_metadata.avatar_url)

/**
 * Logs in the user using OAuth with Google provider.
 * @returns {Promise<void>} A promise that resolves when the login is successful.
 */
export async function login() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/src/html/pagina-principal.html",
      },
    });

    if (error) {
      throw new Error('Error al iniciar sesión');
    }
    console.log(data);
  } catch (error) {
    console.error('Ocurrió un error al iniciar sesión:', error);
  }
}

/**
 * Logs out the user and redirects to the login page.
 * @returns {Promise<void>} A promise that resolves when the user is logged out.
 */
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error('Error al cerrar sesión')
    }

    window.location.replace("http://localhost:5173/src/html/login.html");
  } catch (error) {
    alert('Ocurrió un error al cerrar la sesión, ', error.message)
  }
}

/**
 * Saves the authenticated user data in the database if the user's email is from the unimayor domain.
 * Otherwise, logs the user out.
 * @returns {Promise<void>} A promise that resolves when the user data is saved or the user is logged out.
 */
export async function saveUser() {
  // take authenticated user data
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error al obtener datos de usuario:", error);
    return;
  }

  // check if email user is from unimayor domain. If it is, save user in database else logout
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

/**
 * Retrieves the currently logged-in user.
 * @returns {Promise<Object>} The user object if the user is logged in, otherwise null.
 */
export async function userLogged() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error('Error al obtener datos de usuario');
    }

    return user;
  } catch (error) {
    console.error('Error al obtener datos de usuario:', error);
    return null;
  }
}