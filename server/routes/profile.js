const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const ProfileController = require("../controllers/ProfileController");

const router = express.Router();

router.get("/:id", ProfileController.getById);
router.patch("/", isAuthenticated, ProfileController.edit);
router.delete("/", isAuthenticated, ProfileController.delete);

module.exports = router;