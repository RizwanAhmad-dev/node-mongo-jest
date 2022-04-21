const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userController.js");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:userId", getUserById);

router.post("/", createUser);

module.exports = router;
