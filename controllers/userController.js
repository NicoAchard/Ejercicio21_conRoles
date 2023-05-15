const { Author, Article } = require("../models");
const pagesController = require("./pagesController");
const sequelize = require("sequelize");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");

// Display a listing of the resource Lista de Usuarios.
async function index(req, res) {
  const authors = await Author.findAll();
  const { textoBoton, ruta, textoBotonB, rutaB, textoBotonC, rutaC } =
    pagesController.buttonNavbar(req);

  res.render("usersList", { authors, textoBoton, textoBotonB, ruta, rutaB, textoBotonC, rutaC });
}

// Display the specified resource.
async function show(req, res) {
  const { textoBoton, ruta, textoBotonB, rutaB, textoBotonC, rutaC } =
    pagesController.buttonNavbar(req);
  res.render("login", { textoBoton, ruta, textoBotonB, rutaB, textoBotonC, rutaC });
}

// Show the form for creating a new resource
async function create(req, res) {
  const { textoBoton, ruta, textoBotonB, rutaB, textoBotonC, rutaC } =
    pagesController.buttonNavbar(req);
  res.render("createAccount", { textoBoton, textoBotonB, ruta, rutaB, textoBotonC, rutaC });
}

// Store a newly created resource in storage.
async function store(req, res) {
  await Author.create({
    firstname: req.body.newFirstname,
    lastname: req.body.newLastname,
    email: req.body.newEmail,
    password: await bcrypt.hash(req.body.newPassword, 2),
  });
  return await res.redirect("/login");
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage by Admin.
async function destroy(req, res) {
  await Article.destroy({ where: { authorId: req.params.id } });
  await Author.destroy({ where: { id: req.params.id } });
  return res.redirect("back");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
