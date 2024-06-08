import mongoose from "mongoose";

const CommentSchema: mongoose.Schema = new mongoose.Schema({
  text: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Auction",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const Comment = mongoose.model("Comment", CommentSchema);
