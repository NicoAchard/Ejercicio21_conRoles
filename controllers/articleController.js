const { Article, Comment } = require("../models");
const sequelize = require("sequelize");
const formidable = require("formidable");
const pagesController = require("./pagesController");

// Display a listing of the resource.
async function index(req, res) {
  if (req.user.role === 4 || req.user.role === 3) {
    const articles = await Article.findAll({
      include: "author",

      attributes: [
        "id",
        "title",
        "imageURL",
        "content",
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("Article.createdAt"), "%d/%m/%Y %H:%m"),
          "createdAt",
        ],
      ],
    });
    const { textoBoton, ruta } = pagesController.buttonNavbar(req);
    res.render("admin", { articles, textoBoton, ruta });
  } else if (req.user.role === 2 || req.user.role === 1) {
    const articles = await Article.findAll({
      include: "author",
      where: {
        authorId: req.user.id,
      },
      attributes: [
        "id",
        "title",
        "imageURL",
        "content",
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("Article.createdAt"), "%d/%m/%Y %H:%m"),
          "createdAt",
        ],
      ],
    });
    const { textoBoton, ruta } = pagesController.buttonNavbar(req);
    res.render("admin", { articles, textoBoton, ruta });
  } else {
    res.redirect("/login");
  }
}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: { all: true, nested: true },
    order: [["comments", "createdAt", "DESC"]],
  });

  const { textoBoton, ruta } = pagesController.buttonNavbar(req);
  const isLoggedIn = pagesController.sendCommentButton(req);

  let userFirstname = "";
  let userLastname = "";

  if (req.isAuthenticated()) {
    userFirstname = req.user.firstname;
    userLastname = req.user.lastname;
  }

  return res.render("article", {
    article,
    textoBoton,
    ruta,
    isLoggedIn,
    userFirstname,
    userLastname,
  });
}

// Show the form for creating a new resource
async function create(req, res) {
  const { textoBoton, ruta } = pagesController.buttonNavbar(req);
  res.render("createArticle", { textoBoton, ruta });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
    }
    await Article.create({
      title: fields.title,
      content: fields.content,
      imageURL: files.image.newFilename,
      authorId: req.user.id,
    });
    return await res.redirect("/panel/admin");
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id);
  const { textoBoton, ruta } = pagesController.buttonNavbar(req);
  req.body.title = res.render("editArticle", { article, textoBoton, ruta });
}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
    }
    await Article.update(
      {
        title: fields.title,
        content: fields.content,
        imageURL: files.image.newFilename,
        authorId: req.user.id,
      },
      {
        where: { id: req.params.id },
      },
    );
    return res.redirect("/panel/admin");
  });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({ where: { id: req.params.id } });
  return res.redirect("/panel/admin");
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
