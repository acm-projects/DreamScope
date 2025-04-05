import analyzeDream from "./openAiHelper.js";
import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import sharp from "sharp"; // Image processing library
import mongoose from "mongoose";
import cors from "cors";

import User from './models/User.js';
import DreamPost from './models/DreamPost.js';
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
          dreamPost.emotions,
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

// get dream post by user ID and date
app.get("/api/dreamPosts/users/:userId/date/:date", async (req, res) => {
    try {
      const { userId, date } = req.params;
  
      // 1. Convert userId to ObjectId (if stored as ObjectId)
      let userIdObj;
      try {
        userIdObj = new mongoose.Types.ObjectId(userId);
      } catch (error) {
        return res.status(400).json({ error: "Invalid user ID format" });
      }
  
      // 2. Parse and validate the date (format: "YYYY-MM-DD")
      const parsedDate = new Date(date);
      if (isNaN(parsedDate)) {
        return res
          .status(400)
          .json({ error: "Invalid date format. Use YYYY-MM-DD." });
      }
  
      // 3. Set time to start of day (00:00:00)
      const startOfDay = new Date(parsedDate);
      startOfDay.setUTCHours(0, 0, 0, 0); // Use UTC to avoid timezone issues
  
      // 4. Set end of day (next midnight, 00:00:00)
      const endOfDay = new Date(startOfDay);
      endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);
  
      // 5. Query MongoDB (filter by userId + date range)
      const dreamPost = await DreamPost.findOne({
        userId: userIdObj,
        date: {
          $gte: startOfDay, // After or at start of day
          $lt: endOfDay, // Before next day
        },
      }).select("_id"); // Only return _id
  
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
  
// update a dream post
app.put('/api/dreamPosts/:postId', async (req, res) => {
    try {
        // Step 1: Fetch the current post
        const dreamPost = await DreamPost.findById(req.params.postId);
        if (!dreamPost) {
            return res.status(404).json({ error: "Dream post not found." });
        }

        const dreamText = dreamPost.dreamText;
        if (!dreamText) {
            return res.status(400).json({ error: "dreamText is required to generate visualizations." });
        }

        // Step 2: Generate DALL·E image URLs
        const imageUrls = await getImages(dreamText);
       
        // Step 3: Store each compressed image as BLOB in MongoDB
        for (const imageUrl of imageUrls) {
            await storeImageAsBlob(req.params.postId, imageUrl);
        }

        // Step 4: Update other post data if provided in req.body
        const updateData = { ...req.body };
       
        // Don't overwrite visualizations if they weren't provided in req.body
        if (!req.body.visualizations) {
            delete updateData.visualizations;
        }

        const updatedDreamPost = await DreamPost.findByIdAndUpdate(
            req.params.postId,
            updateData,
            { new: true }
        );

        res.status(200).json(updatedDreamPost);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// Helper function to store compressed image as BLOB
async function storeImageAsBlob(postId, imageUrl) {
    try {
        // 1. Download the image
        const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
            headers: { "User-Agent": "Mozilla/5.0" },
        });

        // 2. Compress and optimize the image
        const compressedImage = await sharp(Buffer.from(response.data))
            .resize({
                width: 1024,         // Set maximum width
                height: 1024,        // Set maximum height
                fit: 'inside',       // Keep aspect ratio
                withoutEnlargement: true // Don't enlarge smaller images
            })
            .png({
                quality: 80,         // Quality percentage (1-100)
                compressionLevel: 9,  // Maximum compression
                progressive: true     // Progressive loading
            })
            .toBuffer();

        // 3. Calculate size savings
        const originalSize = Buffer.from(response.data).length;
        const compressedSize = compressedImage.length;
        const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
       
        console.log(`Compressed image: ${originalSize} bytes → ${compressedSize} bytes (${savings}% reduction)`);

        // 4. Store compressed image in MongoDB
        await DreamPost.findByIdAndUpdate(
            postId,
            {
                $push: {
                    visualizations: {
                        binary: compressedImage,
                        mimeType: "image/png",
                        createdAt: new Date(),
                        originalSize,
                        compressedSize
                    }
                }
            }
        );
       
        console.log("✅ Compressed image stored as BLOB");
    } catch (error) {
        console.error("Error storing image:", error);
        throw error;
    }
}

// GET endpoint to retrieve and decompress base64 images
app.get('/api/dreamPosts/:postId/visualizations', async (req, res) => {
    try {
        // 1. Fetch the post from MongoDB
        const post = await mongoose.model('DreamPost').findById(req.params.postId);
       
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (!post.visualizations || post.visualizations.length === 0) {
            return res.status(404).json({ error: "No visualizations found" });
        }

        // 2. Process all visualizations
        const processedVisualizations = await Promise.all(
            post.visualizations.map(async (vis, index) => {
                try {
                    // Decompress with sharp (optional processing)
                    const processedBuffer = await sharp(vis.binary)
                        .toFormat('png') // Ensure output format
                        .toBuffer();

                    // 3. Convert to base64
                    const base64Image = processedBuffer.toString('base64');
                    const dataURL = `data:${vis.mimeType};base64,${base64Image}`;

                    return {
                        id: vis._id,
                        mimeType: vis.mimeType,
                        createdAt: vis.createdAt,
                        imageUrl: dataURL,
                        metadata: {
                            originalSize: vis.originalSize,
                            compressedSize: vis.compressedSize,
                            compressionRatio: vis.compressedSize
                                ? ((vis.originalSize - vis.compressedSize) / vis.originalSize * 100).toFixed(2)
                                : null
                        }
                    };
                } catch (error) {
                    console.error(`Error processing visualization ${index}:`, error);
                    return {
                        id: vis._id,
                        error: "Failed to process image"
                    };
                }
            })
        );

        // 4. Return the processed data
        res.json({
            postId: post._id,
            title: post.title,
            visualizations: processedVisualizations
        });

    } catch (error) {
        console.error("Error in visualization endpoint:", error);
        res.status(500).json({ error: "Internal server error" });
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