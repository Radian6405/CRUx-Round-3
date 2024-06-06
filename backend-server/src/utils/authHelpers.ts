import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function generateAccessTokens(username: string) {
  return jwt.sign({ username: username }, "random_text", { expiresIn: "1d" });
}

export function authenticateToken(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;

  if (authHeader == null) return res.status(200).send({ message: "no token" });

  jwt.verify(authHeader, "random_text", (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;

    // console.log(req.user);
    next();
  });
}
