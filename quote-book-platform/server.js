import express from "express";
import next from "next";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/User.js";
import bookRoutes from "./routes/Book.js";
import quoteRoutes from "./routes/Quote.js";
import dotenv from "dotenv";
import Book from "./models/Book.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3001;

const server = express();
server.use(morgan("dev")); // Logging
// Connect to MongoDB
connectDB();

// Middleware
server.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL if different
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev")); // Logging

// Serve static files from the 'public' directory
server.use(
  "/uploads",
  express.static(path.join(__dirname, "public", "uploads"))
);
Book.syncIndexes();

// API routes
server.use("/api/users", userRoutes);
server.use("/api/books", bookRoutes);
server.use("/api/quotes", quoteRoutes);
server.get("/", (req, res) => res.json({ running: "Yes" }));
// Handle all other routes with Next.js
//   server.all("*", (req, res) => {
//     return handle(req, res);
//   });

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
