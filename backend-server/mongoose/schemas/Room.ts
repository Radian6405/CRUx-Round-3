import { required } from "joi";
import mongoose from "mongoose";

const RoomSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.String,
  },

  //user details
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    immutable: true,
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  //auction details
  auctionCount: {
    type: mongoose.Schema.Types.Number,
    default: 0,
  },
});

export const Room = mongoose.model("Room", RoomSchema);
