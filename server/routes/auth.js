const express = require("express");
const AuthController = require("../controllers/AuthController");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.get("/me", isAuthenticated, AuthController.getMe);
router.post("/signin", AuthController.signIn);
router.post("/signup", AuthController.signUp);

module.exports = router;