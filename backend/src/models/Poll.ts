import mongoose, { Schema } from "mongoose";

const OptionSchema = new Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const PollSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [OptionSchema], required: true },
  duration: { type: Number, required: true }, // seconds
  startedAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

export const Poll = mongoose.model("Poll", PollSchema);
