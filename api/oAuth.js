const express = require("express");
const passport = require("passport");
const { googleAuthCallback } = require("../controllers/loginGoogleController");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleAuthCallback
);

module.exports = router;
