import mongoose from "mongoose";
import { Bid } from "./Bid";

const AuctionSchema: mongoose.Schema = new mongoose.Schema({
  //general details
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.String,
  },
  basePrice: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    immutable: true,
    min: 0,
  },
  startDate: {
    type: mongoose.Schema.Types.Date,
    required: true,
    immutable: true,
    default: () => Date.now(),
  },
  endDate: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  tags: {
    type: mongoose.Schema.Types.Array,
  },

  //room details
  isPrivate: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    default: null,
  },

  //user details
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  //bidding details
  currentBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bid",
  },

  //comment details
  isCommentDisabled: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },

  //image details
  images: [
    {
      type: mongoose.Schema.Types.String,
    },
  ],
});

export const Auction = mongoose.model("Auction", AuctionSchema);
