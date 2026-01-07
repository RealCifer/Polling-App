import mongoose, { Schema } from "mongoose";

const VoteSchema = new Schema({
  pollId: { type: Schema.Types.ObjectId, ref: "Poll" },
  studentId: String,
  optionIndex: Number,
});

export const Vote = mongoose.model("Vote", VoteSchema);
