const express = require("express");
const router = express.Router();
const Schema = require("../schema/schema");
const bcrypt = require("bcrypt");

router.post("/create", async (req, res, next) => {
  const { name, email, password } = req.body;
  const existingEmail = await Schema.findOne({ email: email });

  if (existingEmail) {
    return res.status(404).json("Email already exists.");
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const newUser = new Schema({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json("Successfull");
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await Schema.findOne({ email: email });

  if (existingUser) {
    try {
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (passwordMatch) {
        res.status(200).json("Login Successfull");
      } else {
        return res.status(404).json("Username/Password Invalid");
      }
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(404).json("Username/Password Invalid");
  }
});

module.exports = router;
