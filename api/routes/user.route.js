import express from "express";
import { testControls, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifiedUser.js";

const router = express.Router();

router.get("/test", testControls);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
