import mongoose, { Schema, model, models } from "mongoose";

const ExamSchema = new Schema({
  date: String,
  time: String,
  room: String,
  subject: String,
  classCode: String,
  teacher: String,
  type: String,
  duration: String,
});

export default models.Exam || model("Exam", ExamSchema);
