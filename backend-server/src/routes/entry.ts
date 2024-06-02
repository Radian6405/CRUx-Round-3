import { Router, Request, Response } from "express";
import { User } from "../../mongoose/schemas/User";
import { comparePassword, hashPassword } from "../utils/helpers";

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

router.post("/api/login", async (req: Request, res: Response) => {
  const {
    body: { username, password },
  } = req;
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) throw new Error();
    if (!comparePassword(password, String(findUser.password)))
      throw new Error();

    req.session.username = String(findUser.username);
    res.sendStatus(200);
  } catch (err) {
    res.status(401).send("Bad Credentials");
  }
});

router.post("/api/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    res.sendStatus(200);
  });
});

router.get("/api/status", (req: Request, res: Response) => {
  res.send(req.session.username);
});

export default router;
