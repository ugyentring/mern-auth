import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI).then(() => {
      console.log("Database connected!");
    });
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
};

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
