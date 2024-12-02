import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true },
});

const User = mongoose.model("User", userSchema);
const api = express();

// API สำหรับการลงทะเบียนผู้ใช้
// api.post("/register", async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   // ตรวจสอบว่า Username ซ้ำหรือไม่
//   const existingUser = await User.findOne({ username });
//   if (existingUser) {
//     return res.status(400).json({ message: "Username already exists" });
//   }

//   // สร้าง User ใหม่
//   const user = new User({
//     username,
//     password,
//     role: "user", // ตั้งค่า role เป็น 'user'
//   });

//   await user.save();

//   // สร้าง Token สำหรับการล็อกอิน
//   const token = jwt.sign({ id: user._id, role: user.role }, "secret-key", {
//     expiresIn: "1h",
//   });

//   res.json({ token, role: user.role });
// });

// API สำหรับการล็อกอิน
api.post("/login", async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  // ตรวจสอบว่าเป็น Admin หรือ User
  const user = await User.findOne({ username, role });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id, role: user.role }, "secret-key", {
    expiresIn: "1h",
  });
  res.json({ token, role: user.role });
});

export { api };
