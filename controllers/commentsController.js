const { Comment } = require("../models");
const pagesController = require("./pagesController");

// Store a newly created resource in storage.
async function store(req, res) {
  await Comment.create({
    authorId: req.user.id,
    content: req.body.content,
    articleId: req.body.articleId,
  });
  res.redirect("back");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const comment = await Comment.findOne({ where: { id: req.params.id } });
  const { textoBoton, ruta, textoBotonB, rutaB, textoBotonC, rutaC } =
    pagesController.buttonNavbar(req);
  return res.render("editComment", {
    comment,
    textoBoton,
    ruta,
    textoBotonB,
    rutaB,
    textoBotonC,
    rutaC,
  });
}

// Update the specified resource in storage.
async function update(req, res) {
  const comment = await Comment.findOne({ where: { id: req.params.id }, include: { all: true } });
  await Comment.update({ content: req.body.content }, { where: { id: req.params.id } });
  return res.redirect(`/articulos/${comment.articleId}`);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Comment.destroy({ where: { id: req.params.id } });
  res.redirect("back");
}

module.exports = {
  store,
  edit,
  update,
  destroy,
};
