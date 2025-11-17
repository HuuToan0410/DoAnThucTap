import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "LECTURER", "STUDENT"], required: true },
    classCode: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

/* ----- Index tối ưu ----- */
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ classCode: 1 });
UserSchema.index({ name: "text" }); // hỗ trợ tìm kiếm tên
UserSchema.index({ createdAt: -1 });

export default mongoose.models.User || mongoose.model("User", UserSchema);
