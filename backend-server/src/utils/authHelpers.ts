import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../mongoose/schemas/User";
import { isValidObjectId } from "mongoose";

const TOKEN_SECRET = "random_text";

export function generateAccessTokens(username: string) {
  return jwt.sign({ username: username }, TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

export function authenticateToken(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;

  if (authHeader == null) return res.status(403).send({ message: "no token" });

  jwt.verify(authHeader, TOKEN_SECRET, async (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    const findUser = await User.findOne({
      username: String(user.username),
    }).select(["username", "email", "isVerified"]);
    if (findUser === null) return res.sendStatus(403);

    req.user = {
      username: String(findUser.username),
      _id: String(findUser._id),
      email: String(findUser.email),
      isVerified: Boolean(findUser.isVerified),
    };

    next();
  });
}
