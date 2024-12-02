import express, { Request, Response } from "express";

const taskRouter = express();
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  hours: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Task = mongoose.model("Task", taskSchema);

// POST: เพิ่ม Task ใหม่
taskRouter.post("/addTask", async (req: Request, res: Response) => {
  try {
    mongoose.connect(
      "mongodb://admin:1234@127.0.0.1:27017/mydb?authSource=mydb"
    );
    const { title, description, hours, date } = req.body;

    const newTask = new Task({
      title,
      description,
      hours: Number(hours),
      date: new Date(date),
    });
    const savedTask = await newTask.save();

    res.status(201).json({
      code: "Success-01-0001",
      status: "Success",
      data: savedTask,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({
      code: "Error-01-0001",
      status: "Error",
      message: "Failed to add task",
    });
  }
});

// GET: ดึง Task ทั้งหมด
taskRouter.get("/getTask", async (req: Request, res: Response) => {
  try {
    mongoose.connect(
      "mongodb://admin:1234@127.0.0.1:27017/mydb?authSource=mydb"
    );
    const tasks = await Task.find();

    res.status(200).json({
      code: "Success-01-0002",
      status: "Success",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      code: "Error-01-0002",
      status: "Error",
      message: "Failed to fetch tasks",
    });
  }
});

// DELETE: ลบงาน
taskRouter.delete("/deleteTask/:id", async (req, res) => {
  const taskId = req.params.id;

  // ตรวจสอบว่า taskId เป็น ObjectId หรือไม่
  console.log("Received taskId:", taskId); // ลองแสดงค่า taskId เพื่อการตรวจสอบ
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "ID ไม่ถูกต้อง" });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "ไม่พบงานที่ต้องการลบ" });
    }

    res.status(200).json({ status: "Success", message: "ลบงานสำเร็จ" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "ไม่สามารถลบงานได้" });
  }
});

export { taskRouter };
