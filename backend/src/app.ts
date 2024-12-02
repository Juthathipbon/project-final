import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { employee } from "./employee/route";
import { taskRouter } from "./task/route";
import { api } from "./login/route";
import { useSwagger } from "../middleware/swagger";

dotenv.config();

mongoose
  .connect("mongodb://admin:1234@127.0.0.1:27017/mydb?authSource=mydb")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/employee", employee);
app.use("/tasks", taskRouter);
app.use("/login",api)
app.use("/swagger", express.static("swagger"));

useSwagger(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
