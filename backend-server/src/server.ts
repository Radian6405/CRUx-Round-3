import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config";
import Routes from "./routes/index";
import session from "express-session";
import passport from "passport";

const PORT: number = config.server.port;
const app: Express = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(
  session({
    secret: "random text",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
      secure: false,
      httpOnly: true,
      sameSite: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(Routes);

(async function startUp() {
  try {
    await mongoose.connect(config.mongo.url, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    });

    console.log("Connection to MongoDB successfully made");

    app.get("/health", (req: Request, res: Response) => {
      res.status(200).json({ message: "Server is running properly" });
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Could not make a connection to the database");
  }
})();
