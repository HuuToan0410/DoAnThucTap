import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    semester: { type: String },
    year: { type: Number },
    status: { type: String, enum: ["Đang học", "Sắp tới", "Đã kết thúc"], required: true },
    description: { type: String },
  },
  { timestamps: true }
);

/* ----- Index tối ưu ----- */
PlanSchema.index({ status: 1 });
PlanSchema.index({ semester: 1 });
PlanSchema.index({ year: 1 });
PlanSchema.index({ semester: 1, status: 1 }); // lọc nhanh các kỳ đang học
PlanSchema.index({ createdAt: -1 });

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
