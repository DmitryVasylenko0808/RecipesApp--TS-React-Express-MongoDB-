const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const RecipeController = require("../controllers/RecipeController");

const router = express.Router();

router.get("/", RecipeController.getAll);
router.get("/:id");
router.get("/favorites/:userId");
router.get("/user/:userId");
router.get("/search/:value");
router.post("/", isAuthenticated);
router.post("/favorites", isAuthenticated);
router.patch("/:id", isAuthenticated);
router.delete("/:id", isAuthenticated);
router.delete("/favorites/:id", isAuthenticated);

module.exports = router;