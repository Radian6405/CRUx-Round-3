import { Router, Request, Response } from "express";
import { User } from "../../mongoose/schemas/User";
import { comparePassword, hashPassword } from "../utils/helpers";
import "../strategies/local-strategy";
import passport from "passport";

const router: Router = Router();

//login, logout and register
router.post("/api/register", async (req: Request, res: Response) => {
  const { body } = req;
  body.password = hashPassword(body.password);

  const newUser = new User(body);
  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.sendStatus(400);
  }
});

router.post(
  "/api/login",
  passport.authenticate("local"),
  async (req: Request, res: Response) => {
    const {
      body: { username },
    } = req;
    res.status(200).send(`logged in as ${username}`);
  }
);

router.post("/api/logout", (req: Request, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
});

router.get("/api/status", (req: Request, res: Response) => {
  res.send(
    req.user
      ? {
          isLoggedIn: true,
          user: req.user,
        }
      : {
          isLoggedIn: false,
        }
  );
});

export default router;
