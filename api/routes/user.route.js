import express from "express";
import {
  deleteUser,
  testControls,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifiedUser.js";

const router = express.Router();

router.get("/test", testControls);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
