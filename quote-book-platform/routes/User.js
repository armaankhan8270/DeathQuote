import express from "express";
import { login, registerUser } from "../controllers/User.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", login);

export default router;
