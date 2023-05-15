const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authenticationController = require("../controllers/authenticationController");
const articleController = require("../controllers/articleController");
const commentsController = require("../controllers/commentsController");
const router = express.Router();

router.get("/");
router.get("/logout", ensureAuthenticated, authenticationController.logOut);

router.get("/admin", ensureAuthenticated, articleController.index);

router.get("/crear", ensureAuthenticated, articleController.create);
router.post("/crear", ensureAuthenticated, articleController.store);

router.get("/:id/editar", ensureAuthenticated, articleController.edit);
router.patch("/:id", ensureAuthenticated, articleController.update);

router.delete("/:id", ensureAuthenticated, articleController.destroy);

router.post("/", commentsController.store);
router.get("/:id/editar", ensureAuthenticated, commentsController.edit);
router.delete("/:id", ensureAuthenticated, commentsController.destroy);

module.exports = router;
