import { Router, Request, Response } from "express";
import { User } from "../../mongoose/schemas/User";
import { comparePassword, hashPassword } from "../utils/helpers";
import {
  authenticateToken,
  generateAccessTokens,
  softAucthenticateToken,
} from "../utils/authHelpers";

import dotenv from "dotenv";
import { sendMail } from "../utils/nodemailer/mailService";
dotenv.config();

const router: Router = Router();

//login, logout and register
router.post("/api/register", async (req: Request, res: Response) => {
  const isValidUsername = /^[0-9A-Za-z]{6,16}$/;
  const isValidPassword = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;
  const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (
    req.body.username === "" ||
    req.body.email === "" ||
    req.body.password === ""
  )
    return res.status(401).send("Missing required credentials");

  if (!isValidUsername.test(req.body.username))
    return res.status(401).send("Invalid Username");
  if (!isValidEmail.test(req.body.email))
    return res.status(401).send("Invalid Email address");
  if (!isValidPassword.test(req.body.password))
    return res.status(401).send("Invalid Password");

  const findUsername = await User.findOne({ username: req.body.username });
  if (findUsername !== null)
    return res.status(401).send("Username already exists");
  const findEmail = await User.findOne({ email: req.body.email });
  if (findEmail !== null) return res.status(401).send("Email already exists");

  const { body } = req;
  body.password = hashPassword(body.password);

  const newUser = new User({ ...body, verifyToken: crypto.randomUUID() });
  try {
    const savedUser = await newUser.save();
    const isMailSent: boolean = await sendVerifyMail(
      String(savedUser.username),
      String(savedUser.email),
      String(savedUser.verifyToken)
    );
    if (isMailSent)
      res.status(201).send({ token: generateAccessTokens(body.username) });
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
    if (findUser == null) return res.status(401).send("User not found");
    if (!comparePassword(password, String(findUser.password)))
      return res.status(401).send("Invalid credentials");
    res.status(200).send(generateAccessTokens(username));
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get(
  "/api/status",
  softAucthenticateToken,
  (req: Request, res: Response) => {
    res.send(req.user);
  }
);

router.post("/api/verify/email", async (req: Request, res: Response) => {
  try {
    if (req.body.token === undefined)
      return res.status(404).send("invalid token");

    const findUser = await User.findOne({ verifyToken: req.body.token });
    if (findUser === null) return res.status(404).send("invalid token");

    findUser.isVerified = true;
    findUser.verifyToken = null;
    const saveUser = await findUser.save();

    res.status(201).send("User verified");
  } catch (error) {
    res.status(401).send(error);
  }
});

async function sendVerifyMail(username: string, email: string, token: string) {
  const from: string = String(process.env.MAIL_USERNAME);
  const to: string = email;
  const subject: string = "Please verify your email address";

  const verifyLink: string = `http://127.0.0.1:5173/verify/email?token=${token}`;
  const mailTemplate: string = `<p>
Hi ${username},<br/>
Thanks for getting started with BitsBids!<br/>
We need a little more information to complete your registration, including a confirmation of your email address.<br/>
Click below to confirm your email address:<br/>
${verifyLink}<br/>
If you have problems, please paste the above URL into your web browser.<br/>
</p>`;

  const mailResponse = await sendMail(from, to, subject, mailTemplate);

  if (mailResponse.accepted.length !== 0) return true;
  else return false;
}

export default router;
