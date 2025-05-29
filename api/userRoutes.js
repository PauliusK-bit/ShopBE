const express = require("express");
const {
  register,
  login,
  getUsers,
  deleteUser,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);

module.exports = router;
