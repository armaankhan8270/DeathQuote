import mongoose from "mongoose";
// lib/db.js
const MONGODB_URI =
  "mongodb+srv://armaankhan:armaan242@cluster0.ygbfntv.mongodb.net/hospital?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
