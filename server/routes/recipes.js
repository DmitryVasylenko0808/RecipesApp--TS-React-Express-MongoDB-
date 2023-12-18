const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const RecipeController = require("../controllers/RecipeController");

const router = express.Router();

router.get("/", RecipeController.getAll);
router.get("/one/:id", RecipeController.getOneById);
router.get("/kinds", RecipeController.getKinds);
router.get("/favorites/:userId", RecipeController.getFavorites);
router.get("/user/:userId", RecipeController.getByUser);
router.get("/search/:value", RecipeController.getSearched);
router.post("/", isAuthenticated, RecipeController.create);
router.post("/favorites", isAuthenticated, RecipeController.addFavorite);
router.patch("/:id", isAuthenticated, RecipeController.edit);
router.patch("/rate/:id", isAuthenticated, RecipeController.rate);
router.delete("/:id", isAuthenticated, RecipeController.delete);
router.delete("/favorites/:id", isAuthenticated, RecipeController.deleteFavorite);

// router.post("/review", isAuthenticated, RecipeController.addReview);

module.exports = router;