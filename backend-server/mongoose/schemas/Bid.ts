import mongoose from "mongoose";

const BidSchema: mongoose.Schema = new mongoose.Schema({
  value: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    immutable: true,
    min: 0,
  },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Auction",
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const Bid = mongoose.model("Bid", BidSchema);
