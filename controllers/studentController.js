import asyncHandler from "../middlewares/asyncHandler.js";
import Student from "../models/studentModel.js";

//create Student
const createStudent = asyncHandler(async (req, res) => {
  const { stuName, stuRollNo, stuEmail, stuMobile } = req.body;
  //validate
  if (!stuName || !stuRollNo || !stuEmail || !stuMobile) {
    throw new Error("Enter all fields..");
  }
  //check already existing or not
  const studentExists = await Student.findOne({ stuRollNo });
  if (studentExists) {
    res.status(400).send("Student Already Exists");
  }
  //new Student
  const newStudent = new Student({ stuName, stuRollNo, stuEmail, stuMobile });
  try {
    await newStudent.save();
    res.status(201).json({
      _id: newStudent._id,
      stuName: newStudent.stuName,
      stuRollNo: newStudent.stuRollNo,
      stuEmail: newStudent.stuEmail,
      stuMobile: newStudent.stuMobile,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//get All students
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.json(students);
});

//delete Student by id
const deleteStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await student.deleteOne({ _id: student._id });
    res.json({ message: "Student deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//get Student by id
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//update Student by id
const updateStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    student.stuName = req.body.stuName || student.stuName;
    student.stuRollNo = req.body.stuRollNo || student.stuRollNo;
    student.stuEmail = req.body.stuEmail || student.stuEmail;
    student.stuMobile = req.body.stuMobile || student.stuMobile;

    const updatedStudent = await student.save();
    res.json({
      _id: updatedStudent._id,
      stuName: updatedStudent.stuName,
      stuRollNo: updatedStudent.stuRollNo,
      stuEmail: updatedStudent.stuEmail,
      stuMobile: updatedStudent.stuMobile,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createStudent,
  getAllStudents,
  deleteStudentById,
  getStudentById,
  updateStudentById,
};
