import mongoose, { mongo } from "mongoose";

const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },

  //verification details
  isVerified: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  verifyToken: {
    type: mongoose.Schema.Types.String,
  },
});

export const User = mongoose.model("User", UserSchema);
