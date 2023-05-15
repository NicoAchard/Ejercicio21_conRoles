const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authenticationController = require("../controllers/authenticationController");
const articleController = require("../controllers/articleController");
const commentsController = require("../controllers/commentsController");
const userController = require("../controllers/userController");
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
router.get("/comments/:id/editar", ensureAuthenticated, commentsController.edit);
router.patch("/comments/:id/editar", ensureAuthenticated, commentsController.update);
router.delete("/comments/:id", ensureAuthenticated, commentsController.destroy);

router.get("/admin/usersList", ensureAuthenticated, userController.index);
router.delete("/admin/:id", ensureAuthenticated, userController.destroy);

module.exports = router;
