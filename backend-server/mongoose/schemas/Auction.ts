import mongoose from "mongoose";

const AuctionSchema: mongoose.Schema = new mongoose.Schema({
  //general details
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true,
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

  //user details
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  //bidding details
});

export const Auction = mongoose.model("Auction", AuctionSchema);
