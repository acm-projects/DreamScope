import analyzeDream from "./openAiHelper.js";
import storeImageAsBlob from "./storeImage.js";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import User from './models/User.js';
import DreamPost from './models/DreamPost.js';
import weeklyCheckIn from "./models/weeklyCheckIn.js";
import getImages from './visualization.js';

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

//dream post routes

app.post('/api/dreamPosts', async (req, res) => {
  try {
    const { userId, title, type, dreamText, selectedThemes, selectedSettings, selectedEmotions } = req.body;

    console.log(userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const checkIn = await weeklyCheckIn.find({ userId: userId });

    console.log("got to weekly checkin:", weeklyCheckIn);

    const dreamPost = new DreamPost({
      userId,
      title,
      type,
      dreamText,
      selectedThemes,
      selectedSettings,
      selectedEmotions,
    });

    const analysisResult = await analyzeDream(
      dreamPost.dreamText,
      dreamPost.selectedThemes,
      dreamPost.selectedSettings,
      dreamPost.selectedEmotions,
      user?.recurringPeople,
      user?.recurringObjects,
      user?.recurringPlaces,
      user?.recurringThemes,
      checkIn?.checkInArray,
    );

    dreamPost.analysis = analysisResult.analysis;
    dreamPost.dreamPeople = analysisResult.people;
    dreamPost.dreamObjects = analysisResult.objects;
    dreamPost.dreamPlaces = analysisResult.places;
    dreamPost.dreamThemes = analysisResult.themes;
    user.recurringPeople = analysisResult.recurringPpl;
    user.recurringObjects = analysisResult.recurringObj;
    user.recurringPlaces = analysisResult.recurringPla;
    user.recurringThemes = analysisResult.recurringThem;


    await user.save();

    const imageUrls = await getImages(dreamText);


    const s3Keys = [];
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const key = await storeImageAsBlob(
        dreamPost._id,
        imageUrl,
        dreamPost.userId,
        i + 1 // index starting from 1
      );
      if (key) {
        s3Keys.push(
          `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`
        );
      }
    }

    dreamPost.visualizations = s3Keys;

    await dreamPost.save();
    res.status(201).json(dreamPost);
  } catch (error) {
    console.error("Error processing dream post:", error);
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


app.get('/api/dreamPosts/users/:userId/dates', async (req, res) => {
  try {
    const { userId } = req.params;

    const userDreamPosts = await DreamPost.find({ userId: userId }, 'date');
    const userDates = userDreamPosts.map(post => post.date);

    // To get only unique dates for the user:
    const uniqueUserDates = [...new Set(userDates.map(date => date.toISOString().split('T')[0]))];

    res.status(200).json(uniqueUserDates);
  } catch (error) {
    console.error("Error fetching dream post dates for user:", error);
    res.status(500).json({ error: error.message });
  }
});

// update a dream post
app.put("/api/dreamPosts/:postId", async (req, res) => {
  try {
    // Step 1: Fetch the current post
    const dreamPost = await DreamPost.findById(req.params.postId);
    if (!dreamPost) {
      return res.status(404).json({ error: "Dream post not found." });
    }


    const dreamText = dreamPost.dreamText;
    if (!dreamText) {
      return res
        .status(400)
        .json({ error: "dreamText is required to generate visualizations." });
    }


    // Step 2: Generate DALL·E image URLs
    const imageUrls = await getImages(dreamText);


    const s3Keys = [];
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const key = await storeImageAsBlob(
        dreamPost._id,
        imageUrl,
        dreamPost.userId,
        i + 1 // index starting from 1
      );
      if (key) {
        s3Keys.push(
          `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`
        );
      }
    }


    dreamPost.visualizations = s3Keys;


    const updatedDreamPost = await DreamPost.findByIdAndUpdate(
      req.params.postId,
      dreamPost,
      { new: true }
    );


    res.status(200).json(updatedDreamPost);
  } catch (error) {
    console.error(error);
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

app.delete('/api/dreamPosts/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const originalTotalDreams = user.totalDreams;
    const originalFragDreams = user.fragDreams;
    const originalDetailedDreams = user.detailedDreams;

    const result = await DreamPost.deleteMany({ userId: userId });

    await User.findByIdAndUpdate(userId, {
      totalDreams: 0,
      fragDreams: 0,
      detailedDreams: 0,
    });

    res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} dream posts for user ${userId}.`,
      originalCounts: {
        totalDreams: originalTotalDreams,
        fragDreams: originalFragDreams,
        detailedDreams: originalDetailedDreams,
      },
    });
  } catch (error) {
    console.error('Error deleting dream posts:', error);
    res.status(500).json({ error: error.message });
  }
});

//user, date
app.get("/api/dreamPosts/users/:userId/date/:date", async (req, res) => {
  try {
    const { userId, date } = req.params;
    let userIdObj;
    try {
      userIdObj = new mongoose.Types.ObjectId(userId);
    } catch (error) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    const startOfDay = new Date(parsedDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(parsedDate).setUTCDate(parsedDate.getUTCDate() + 1));

    const dreamPost = await DreamPost.findOne({
      userId: userIdObj,
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    }).select("_id");

    if (!dreamPost) {
      return res.status(404).json({
        error: "No dream post found for this user on the specified date.",
      });
    }

    res.status(200).json(dreamPost);
  } catch (error) {
    console.error("Error fetching dream post:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/checkIn/user/:userId', async (req, res) => {
  const { checkInText, date } = req.body;
  const { userId } = req.params;

  try {
    const checkIn = new weeklyCheckIn({
      userId: userId,
      checkInArray: [checkInText],
      dateArray: [date],
    });
    const savedCheckIn = await checkIn.save();
    res.status(201).json(savedCheckIn);
  } catch (error) {
    console.error("Error creating check-in:", error);
    res.status(500).json({ error: "Failed to create check-in" });
  }
});

app.put('/api/checkIn/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { checkInText, date } = req.body;

  try {

    const checkInDocument = await weeklyCheckIn.findOne({ userId: userId });

    if (!checkInDocument) {
      checkInDocument = new weeklyCheckIn({
        userId: userId,
        checkInArray: [checkInText],
        dateArray: [date],
      });
    }
    else {
      checkInDocument.checkInArray.push(checkInText);
      checkInDocument.dateArray.push(date);
    }
    const updatedCheckIn = await checkInDocument.save();
    res.status(200).json(updatedCheckIn);
  } catch (error) {
    console.error("Error updating check-in:", error);
    res.status(500).json({ error: "Failed to update check-in" });
  }
});

app.get('/api/allcheckIns/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const checkIns = await weeklyCheckIn.findOne({ userId: userId });

    if (!checkIns) {
      return res.status(404).json({ error: "No check-in data found for this user" });
    }

    res.status(200).json(checkIns.checkInArray);
  } catch (error) {
    console.error("Error fetching check-ins:", error);
    res.status(500).json({ error: "Failed to fetch check-ins" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));