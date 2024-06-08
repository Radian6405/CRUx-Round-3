import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface User {
      _id: string;
      username: string;
      email: string;
    }
  }
}

export {};
