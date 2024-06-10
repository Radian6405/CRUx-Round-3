import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config";
import Routes from "./routes/index";

import { v2 as cloudinary } from "cloudinary";

const PORT: number = config.server.port;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(Routes);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
