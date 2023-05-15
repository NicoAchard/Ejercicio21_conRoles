/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */

const { Article } = require("../models");

function buttonNavbar(req) {
  let textoBoton = "";
  let ruta = "";
  let textoBotonC = "";
  let rutaC = "";
  if (req.isAuthenticated() && req.user.role === 4) {
    textoBoton = "Lista de articulos";
    ruta = "/panel/admin";
    textoBotonB = "Log Out";
    rutaB = "/panel/logout";
    textoBotonC = "Lista de usuarios";
    rutaC = "/panel/admin/usersList";
  } else if (req.isAuthenticated() && req.user.role === 3) {
    textoBoton = "Lista de articulos";
    ruta = "/panel/admin";
    textoBotonB = "Log Out";
    rutaB = "/panel/logout";
  } else if (req.isAuthenticated() && req.user.role === 2) {
    textoBoton = "Lista de articulos";
    ruta = "/panel/admin";
    textoBotonB = "Log Out";
    rutaB = "/panel/logout";
  } else if (req.isAuthenticated()) {
    textoBotonB = "Log Out";
    rutaB = "/panel/logout";
  } else {
    textoBoton = "Login";
    textoBotonB = "Register";
    ruta = "/login";
    rutaB = "/registrarse";
  }
  return { textoBoton, ruta, textoBotonB, rutaB, textoBotonC, rutaC };
}

function sendCommentButton(req) {
  return req.isAuthenticated();
}

async function showHome(req, res) {
  const articles = await Article.findAll({
    order: [["createdAt", "DESC"]],
    include: "author",
  });
  const { textoBoton, ruta, textoBotonB, rutaB, textoBotonC, rutaC } = buttonNavbar(req);
  res.render("home", { articles, textoBoton, ruta, textoBotonB, rutaB, textoBotonC, rutaC });
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showContact,
  showAboutUs,
  buttonNavbar,
  sendCommentButton,
};
