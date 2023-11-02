import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: String,
  firstName: String,
  dateCreated: Date,
  department: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
