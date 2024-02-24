import express from "express";
import {
  createStudent,
  getAllStudents,
  deleteStudentById,
  getStudentById,
  updateStudentById
} from "../controllers/studentController.js";

const router = express.Router();

router.route("/").post(createStudent).get(getAllStudents);

router
  .route("/:id")
  .get(getStudentById)
  .put(updateStudentById)
  .delete(deleteStudentById);

export default router;
