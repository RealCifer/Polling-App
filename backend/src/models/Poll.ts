import mongoose, { Schema, Document } from "mongoose";

export interface Option {
  text: string;
  votes: number;
}

export interface PollDocument extends Document {
  question: string;
  options: Option[];
  isActive: boolean;
  createdAt: Date;
}

const OptionSchema = new Schema<Option>({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const PollSchema = new Schema<PollDocument>({
  question: { type: String, required: true },
  options: { type: [OptionSchema], required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Poll = mongoose.model<PollDocument>("Poll", PollSchema);
