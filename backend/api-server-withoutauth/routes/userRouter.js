const express = require("express");
const router = express.Router();
const {
    createUser: signup,  // alias: use createUser as signup
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

// Authenticate the user
router.post("/signup", signup);
router.post("/login", loginUser);

// Users
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;