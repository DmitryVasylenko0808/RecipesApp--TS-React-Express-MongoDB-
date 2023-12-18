const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const RecipeFavoriteController = require("../controllers/RecipeFavoriteContoller");

const router = express.Router();

router.get("/:userId", RecipeFavoriteController.get);
router.post("/", isAuthenticated, RecipeFavoriteController.add);
router.delete("/:id", isAuthenticated, RecipeFavoriteController.delete);

module.exports = router;