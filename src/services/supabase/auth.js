import supabase from "./supabaseClient";

/**
 * Logs in the user using OAuth with Google provider.
 * @returns {Promise<void>} A promise that resolves when the login is successful.
 */
export async function login() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      // options: {
      //   redirectTo: "http://localhost:5173/src/html/pagina-principal.html",
      // },
    });

    if (error) {
      throw new Error('Error al iniciar sesión');
    }

    // save user data in the database
    await saveUser();
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
  try {
    // Take authenticated user data
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error('Error al obtener datos de usuario');
    }

    // Check if user exists in database
    const { data: checkUser, error: errorCheckUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email);

    if (errorCheckUser) {
      throw new Error('Error al buscar usuario');
    }

    if (checkUser.length > 0) {
      // User already exists in the database
      // console.log('Usuario ya existe en la base de datos');
      return;
    }

    // Check if email user is from unimayor domain. If it is, save user in database; otherwise, logout
    if (user.email.endsWith("@unimayor.edu.co")) {
      await supabase.from("users").insert([
        {
          name: user.user_metadata.name,
          email: user.email,
          imgUserGoogle: user.user_metadata.avatar_url,
        },
      ]);
      // console.log('Usuario guardado en la base de datos');
    } else {
      await supabase.auth.signOut();
      // console.log('Usuario deslogueado por no pertenecer a la universidad');
    }
  } catch (error) {
    console.error("Error al guardar datos de usuario:", error);
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