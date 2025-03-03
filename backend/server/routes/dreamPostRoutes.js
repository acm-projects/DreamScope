const express = require("express");
const router = express.Router();
const DreamPost = require("../models/DreamPost");

// Create a new dream post
router.post("/", async (req, res) => {
  try {
    const dreamPost = new DreamPost(req.body);
    await dreamPost.save();
    res.status(201).json(dreamPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all dream posts
router.get("/", async (req, res) => {
  try {
    const dreamPosts = await DreamPost.find().populate("user_id", "name email");
    res.json(dreamPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;