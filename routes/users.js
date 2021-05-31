const express = require("express");
const adminValidation = require("../middleware/roleValidation");
const router = express.Router();
const userService = require("../service/userService");

router.post("/signup", async (req, res) => {
  try {
    await userService.signup(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.login(email, password);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/login", (req, res) => {
  res.redirect("/videogames/all");
});

module.exports = router;
