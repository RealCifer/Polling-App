import mongoose, { Schema } from "mongoose";

const OptionSchema = new Schema({
  text: String,
  votes: { type: Number, default: 0 },
});

const PollSchema = new Schema({
  question: String,
  options: [OptionSchema],
  duration: Number,
  startedAt: Date,
  isActive: Boolean,
});

export const Poll = mongoose.model("Poll", PollSchema);
