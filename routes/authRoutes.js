const express = require("express");

const { register, login, me } = require("../controllers/authController");
const checkAuth  = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", checkAuth, me);

module.exports = router;