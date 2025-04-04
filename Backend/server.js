import analyzeDream from "./openAiHelper.js";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import User from './models/User.js';
import DreamPost from './models/DreamPost.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB 
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to DreamScope API");
});

//get all users
app.get("/users", async (req, res) => { //corrected path to /users
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create a new user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
  }
  if (!email.includes('@')) {
      return res.status(400).json({ error: "Invalid email format" });
  }
  try {
      const user = new User({ name, email });
      await user.save();
      res.status(201).json(user);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.get('/api/dreamPosts/post/:postId', async (req, res) => {
    try {
        const dreamPost = await DreamPost.findById(req.params.postId);
        if (!dreamPost) {
            return res.status(404).json({ error: "Dream post not found." });
        }
        res.status(200).json(dreamPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/users/email/:email", async (req, res) => {
  try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
          console.log("User not found for email:", req.params.email); // Log if user not found
          return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching user:", error); // Log the error
      res.status(500).json({ error: error.message });
  }
});

// update user
app.put("/users/:userId", async (req, res) => {
  try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ error: "User not found" });
      }
      res.json(updatedUser);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// delete user
app.delete("/users/:userId", async (req, res) => {
  try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) {
          return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//dream post routes

app.post('/api/dreamPosts', async (req, res) => {
  try {
      const { userId, title, type, dreamText, dreamFragments, themes, settings, emotions } = req.body;
      const combinedDreamText = type === "Fragmented" ? dreamFragments.join('\n') : dreamText;

      const dreamPost = new DreamPost({
          userId,
          title,
          type,
          dreamText: combinedDreamText,
          dreamFragments,
          themes,
          settings,
          emotions, 
      });
      const analysis = await analyzeDream(
          dreamPost.dreamText,
          dreamPost.themes,
          dreamPost.settings,
          dreamPost.emotions
      );
      dreamPost.analysis = analysis;
      console.log(dreamPost);
     await dreamPost.save();

      res.status(201).json(dreamPost);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// get dream posts by user ID
app.get('/api/dreamPosts/user/:userId', async (req, res) => {
  try {
    const dreamPosts = await DreamPost.find({ userId: req.params.userId });
    console.log("Dream Posts:", dreamPosts); // Log the dream posts
      if (!dreamPosts || dreamPosts.length === 0) {
          return res.status(404).json({ error: "No dream posts found for this user." });
      }
      res.status(200).json(dreamPosts);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// update a dream post
app.put('/api/dreamPosts/:postId', async (req, res) => {
  try {
      const updatedDreamPost = await DreamPost.findByIdAndUpdate(req.params.postId, req.body, { new: true });
      if (!updatedDreamPost) {
          return res.status(404).json({ error: "Dream post not found." });
      }
      res.status(200).json(updatedDreamPost);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

//delete a dream post
app.delete('/api/dreamPosts/:postId', async (req, res) => {
  try {
      const deletedDreamPost = await DreamPost.findByIdAndDelete(req.params.postId);
      if (!deletedDreamPost) {
          return res.status(404).json({ error: "Dream post not found." });
      }
      res.status(200).json({ message: "Dream post deleted successfully." });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('/api/dreamPosts/user/:userId/date/:date/postId/:postId', async (req, res) => {
    try {
        const { userId, date } = req.params;
        const parsedDate = new Date(date);
        parsedDate.setHours(0, 0, 0, 0);

        const endDate = new Date(parsedDate);
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(0, 0, 0, 0);

        const dreamPost = await DreamPost.findOne({
            userId: userId, // Corrected from _id to userId.
            date: {
                $gte: parsedDate,
                $lt: endDate,
            },
        });

        if (!dreamPost) {
            return res.status(404).json({ error: "No dream post found for this user on the specified date." });
        }

        res.status(200).json(dreamPost);
    } catch (error) {
        console.error("Error fetching dream post by date:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));