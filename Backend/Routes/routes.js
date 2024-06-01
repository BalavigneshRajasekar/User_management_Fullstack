const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/user");
const Register = require("../models/registeredUser");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/addUser", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/getUser", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("no user found");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(updateUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(deleteUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/Users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const addedUser = new Register({ name, email, password: hashedPassword });
    await addedUser.save();
    res.status(200).send("User Created successfully");
  } catch (err) {
    res.status(400).send("error while creating user");
  }
});

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid Password");
    }
    res.status(200).send("Logged in successfully");
  } catch (err) {
    res.status(400).send("error while logging in");
  }
});
module.exports = router;
