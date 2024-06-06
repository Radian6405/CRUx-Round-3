import { Router, Request, Response } from "express";
import { User } from "../../mongoose/schemas/User";
import { comparePassword, hashPassword } from "../utils/helpers";
import { authenticateToken, generateAccessTokens } from "../utils/authHelpers";

const router: Router = Router();

//login, logout and register
router.post("/api/register", async (req: Request, res: Response) => {
  const { body } = req;
  body.password = hashPassword(body.password);

  const newUser = new User(body);
  try {
    const savedUser = await newUser.save();
    res.status(201).send(generateAccessTokens(body.username));
  } catch (err) {
    console.log(`Error: ${err}`);
    res.sendStatus(400);
  }
});

router.post("/api/login", async (req: Request, res: Response) => {
  const {
    body: { username, password },
  } = req;
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) throw new Error("User not found");
    if (!comparePassword(password, String(findUser.password)))
      throw new Error("Invalid credentials");
    res.status(200).send(generateAccessTokens(username));
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/api/status", authenticateToken, (req: Request, res: Response) => {
  res.send(req.user);
});

export default router;
