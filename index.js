import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
