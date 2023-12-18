const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const ReviewController = require("../controllers/ReviewController");

const router = express.Router();

router.get("/:recipeId", ReviewController.get);
router.post("/", isAuthenticated, ReviewController.add);

module.exports = router;