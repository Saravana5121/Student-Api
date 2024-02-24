import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  stuName: {
    type: String,
    required: true,
  },
  stuRollNo: {
    type: String,
    required: true,
    unique: true,
  },
  stuEmail: {
    type: String,
    required: true,
    unique: true,
  },
  stuMobile: {
    type: String,
    validate: {
      validator: function (v) {
        // Define your regex pattern for mobile number validation
        return /\d{10}/.test(v); // This regex expects a 10-digit number
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
