import mongoose, { Schema, Document } from "mongoose";

export interface Option {
  text: string;
  votes: number;
}

export interface PollDocument extends Document {
  question: string;
  options: Option[];
  isActive: boolean;
  voters: string[]; 
  createdAt: Date;
  updatedAt: Date;
}

const optionSchema = new Schema<Option>({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const pollSchema = new Schema<PollDocument>(
  {
    question: { type: String, required: true },
    options: { type: [optionSchema], required: true },
    isActive: { type: Boolean, default: true },

    voters: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Poll = mongoose.model<PollDocument>("Poll", pollSchema);
export default Poll;
