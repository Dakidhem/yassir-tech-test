import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  checkIn: Date,

  checkOut: Date,

  comment: String,

  time: Number,
});

const Time = mongoose.model("Time", timeSchema);
export default Time;
