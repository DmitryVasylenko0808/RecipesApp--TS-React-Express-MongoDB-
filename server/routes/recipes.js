const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const RecipeController = require("../controllers/RecipeController");

const router = express.Router();

router.get("/", RecipeController.getAll);
router.get("/:id", RecipeController.getOneById);
router.get("/favorites/:userId", RecipeController.getFavorites);
router.get("/user/:userId", RecipeController.getByUser);
router.get("/search/:value", RecipeController.getSearched);
router.post("/", isAuthenticated, RecipeController.create);
router.post("/favorites", isAuthenticated, RecipeController.addFavorite);
router.patch("/:id", isAuthenticated);
router.delete("/:id", isAuthenticated);
router.delete("/favorites/:id", isAuthenticated);

module.exports = router;