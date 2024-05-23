import { userLogged } from "/src/services/supabase/auth";

const user = await userLogged();

if (user) {
  window.location.replace(
    "http://localhost:5173/src/html/pagina-principal.html"
  );
} else {
  window.location.replace("http://localhost:5173/src/html/login.html");
}
