import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  verifyOtpAndChangePassword,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify_email/:id", verifyEmail);
router.post("/forget_password", forgotPassword);
router.post("/verify_otp_and_change_password", verifyOtpAndChangePassword);

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
