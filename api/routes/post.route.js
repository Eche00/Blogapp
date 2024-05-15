import { createPost } from "../controllers/post.controller.js";
import express from "express";
import { verifyToken } from "../utils/verifiedUser.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);

export default router;
