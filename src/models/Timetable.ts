import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
  week: String,
  day: String,
  period: String,
  subject: String,
  teacher: String,
  room: String,
  type: String,
  classCode: String,
}, { timestamps: true });

TimetableSchema.index({ classCode: 1 });
TimetableSchema.index({ teacher: 1 });
TimetableSchema.index({ week: 1 });

export default mongoose.models.Timetable || mongoose.model("Timetable", TimetableSchema);



// import mongoose, { Schema, model, models } from "mongoose";

// const TimetableSchema = new Schema({
//   week: String,       // Tuần áp dụng (VD: 03-11-2025)
//   day: String,        // Thứ (VD: Thứ Hai)
//   period: String,     // Tiết (VD: 1, 2, 3...)
//   subject: String,
//   teacher: String,
//   room: String,
//   type: String,       // Lý thuyết / Thực hành
//   classCode: String,  // Mã lớp
// });

// export default models.Timetable || model("Timetable", TimetableSchema);
