import express from "express";
import {
  deleteUser,
  getUser,
  signOut,
  testControls,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifiedUser.js";

const router = express.Router();

router.get("/test", testControls);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signOut);
router.get("/getusers", verifyToken, getUser);

export default router;
