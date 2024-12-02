// employee.ts
import express, { Request, Response } from "express";
const employee = express();
const mongoose = require("mongoose");

// Define Employee schema
const employeeSchema = new mongoose.Schema({
  empId: String,
  name: String,
  position: String,
  department: String,
  status: String,
  idcard: String,
  email: String,
  phone: String,
  address: String,
  fristDate: String,
  description: {
    dateWork: String,
    descriptionjob: String,
    workProgress: String,
    workHour: String,
  },
});

// Employee model
const Employee = mongoose.model("Employee", employeeSchema);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User sign-in
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       401:
 *         description: Unauthorized
 */
employee.get("/getList", async (req: Request, res: Response) => {
  try {
    mongoose.connect(
      "mongodb://admin:1234@127.0.0.1:27017/mydb?authSource=mydb"
    )
    const dbResponse = await Employee.find();
    res.status(200).json({
      code: "Success-01-0001",
      status: "Success",
      data: dbResponse, // ส่งข้อมูลที่ดึงจาก MongoDB
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      code: "Error-01-0001",
      status: "Error",
      message: "Failed to fetch employees",
    });
  }
});

export { employee };

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User sign-in
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       401:
 *         description: Unauthorized
 */
employee.post("/addData", async (req: Request, res: Response) => {
  try {
    const newEmployee = req.body;
    mongoose.connect(
      "mongodb://admin:1234@127.0.0.1:27017/mydb?authSource=mydb"
    );

    const dbResponse = await Employee.insertMany([newEmployee]); // เพิ่มพนักงานใหม่
    mongoose.connection.close();
    res.status(200).json({
      code: "Success-01-0001",
      status: "Success",
      data: dbResponse, // ส่งข้อมูลกลับ
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: "Error-01-0001",
      status: "Error",
      message: "Failed to add employees",
    });
  }
});


// employee.post("/updateData", async (req: Request, res: Response) => {
//   const body = req.body; // รับข้อมูลพนักงานที่ต้องการอัปเดตจาก client

//   if (!body.empId) {
//     return res.status(400).json({
//       code: "Error-01-0003",
//       status: "Error",
//       message: "Employee ID is required.",
//     });
//   }

//   try {
//     // เชื่อมต่อ MongoDB (ตรวจสอบว่าเชื่อมต่อเรียบร้อยแล้ว)
//     await mongoose.connect(
//       "mongodb://admin:1234@127.0.0.1:27017/mydb?authSource=mydb"
//     );

//     // อัปเดตข้อมูลพนักงาน
//     const updatedEmployee = await Employee.findOneAndUpdate(
//       { empId: body.empId }, // ค้นหาพนักงานโดย empId
//       { $set: body }, // อัปเดตข้อมูลที่ส่งมาใน body
//       { new: true } // ให้ MongoDB ส่งข้อมูลหลังอัปเดตกลับมา
//     );

//     if (!updatedEmployee) {
//       // ถ้าหาไม่เจอ
//       return res.status(404).json({
//         code: "Error-01-0002",
//         status: "Error",
//         message: "Employee not found.",
//       });
//     }

//     // ส่งข้อมูลที่อัปเดตกลับไปให้ client
//     res.status(200).json({
//       code: "Success-01-0002",
//       status: "Success",
//       data: updatedEmployee,
//     });
//   } catch (error) {
//     console.error("Error updating employee:", error);

//     res.status(500).json({
//       code: "Error-01-0001",
//       status: "Error",
//       message: "Failed to update employee.",
//     });
//   }
// });


