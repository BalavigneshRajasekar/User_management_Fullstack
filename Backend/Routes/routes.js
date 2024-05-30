const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/user");

const router = express.Router();

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

module.exports = router;
