const { Comment } = require("../models");

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
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Comment.destroy({ where: { articleId: req.params.id } });
  console.log(Comment, articleID, req.params.id);
  res.json(Comment, articleID, req.params.id);
}

module.exports = {
  store,
  edit,
  update,
  destroy,
};
