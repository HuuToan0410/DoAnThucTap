import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    room: { type: String, required: true },
    classCode: { type: String, required: true },
    teacher: { type: String },
  },
  { timestamps: true }
);

/* ----- Index tối ưu hiệu năng ----- */
ExamSchema.index({ date: 1 });
ExamSchema.index({ classCode: 1 });
ExamSchema.index({ subject: 1 });
ExamSchema.index({ room: 1, date: 1 }); // tìm phòng theo ngày (chống trùng lịch)
ExamSchema.index({ createdAt: -1 });

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
