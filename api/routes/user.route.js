import express from "express";
import { testControls } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", testControls);
export default router;
