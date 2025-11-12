import mongoose, { Schema, model, models } from "mongoose";

const PlanSchema = new Schema({
  semester: String,
  startDate: String,
  endDate: String,
  status: String,
  description: String,
});

export default models.Plan || model("Plan", PlanSchema);
