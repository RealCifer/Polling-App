import mongoose, { Schema, Document } from "mongoose";

export interface VoteDocument extends Document {
  pollId: string;
  optionIndex: number;
  socketId: string;
}

const VoteSchema = new Schema<VoteDocument>({
  pollId: { type: String, required: true },
  optionIndex: { type: Number, required: true },
  socketId: { type: String, required: true },
});

export const Vote = mongoose.model<VoteDocument>("Vote", VoteSchema);
