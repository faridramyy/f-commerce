import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import secrets from "../config/secrets.js";
import sendEmail from "../utilities/emailService.js";
import otpGenerator from "otp-generator";

const generateAndSendToken = (user, res, statusCode = 200) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    secrets.JWT_SECRET,
    { expiresIn: "3d" }
  );

  res.status(statusCode).cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  });

  return token;
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    sendEmail({
      to: email,
      subject: "Verify your email",
      text: `Please verify your email by clicking the link below.\n http://${secrets.HOST}:${secrets.PORT}/api/users/verify_email/${user._id}`,
    });

    generateAndSendToken(user, res, 201); // 201 Created
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Wrong username or password" });
    }

    generateAndSendToken(user, res, 200); // 200 OK
    res.json({ message: "Login successful", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  console.log(req.params.id);
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error verifying email", error });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "No user registered with this email" });
    }

    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6);
    user.resetOtp = otp;
    user.otpExpireAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();

    sendEmail({
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const verifyOtpAndChangePassword = async (req, res) => {
  const { otp, password } = req.body;

  if (!otp || !password) {
    return res.status(400).json({ message: "OTP and Passworsd are required." });
  }

  try {
    const user = await User.findOne({ resetOtp: otp });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP." });
    }
    if (user.otpExpireAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    user.password = password;
    await user.save();

    res
      .status(200)
      .json({ message: "OTP verified and password chnaged successfully!" });
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
