import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const storeImageAsBlob = async (postId, imageUrl, userId, index) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = response.data;

    const dateStr = new Date().toISOString().split("T")[0]; // e.g., "2025-04-11"
    const key = `users/${userId}/${postId}/${dateStr}_${index + 1}.png`;

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: imageBuffer,
      ContentType: "image/png",
    };

    await s3.send(new PutObjectCommand(uploadParams));
    console.log(`Image uploaded to S3 at ${key}`);
    return key;
  } catch (error) {
    console.error("Error uploading image to S3:", error.message);
    return null;
  }
};

export default storeImageAsBlob;