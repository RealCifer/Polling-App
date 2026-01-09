import mongoose, { Schema, Document } from "mongoose";

export interface Option {
  text: string;
  votes: number;
}

export interface PollDocument extends Document {
  question: string;
  options: Option[];
  isActive: boolean;
  duration: number;   
  startTime: Date;    
  voters: string[];
  createdAt: Date;
  updatedAt: Date;
}

const optionSchema = new Schema({
  text: String,
  votes: { type: Number, default: 0 },
});

const pollSchema = new Schema(
  {
    question: String,
    options: [optionSchema],
    isActive: { type: Boolean, default: true },
    duration: { type: Number, required: true }, 
    startTime: { type: Date, required: true },
    voters: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<PollDocument>("Poll", pollSchema);
