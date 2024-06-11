import { Router, Request, Response } from "express";
import { Auction } from "../../mongoose/schemas/Auction";
import { Room } from "../../mongoose/schemas/Room";
import { parseAuction } from "../utils/helpers";
import { ObjectId } from "mongoose";
import {
  authenticateToken,
  softAucthenticateToken,
} from "../utils/authHelpers";
import { upload, uploadToCloudinary } from "../utils/cloudinary/fileFunctions";

import dotenv from "dotenv";
import { sendMail } from "../utils/nodemailer/mailService";
dotenv.config();

const router: Router = Router();

router.get(
  "/api/getall/auctions/public",
  async (req: Request, res: Response) => {
    try {
      const auctions = await Auction.where("isPrivate")
        .equals(false)
        .select([
          "title",
          "description",
          "basePrice",
          "seller",
          "tags",
          "currentBid",
        ])
        .limit(20)
        .populate("seller", ["username"])
        .populate("currentBid", ["value"]);

      const parsedAuctions = auctions.map((data) => {
        return parseAuction(data);
      });
      res.send(parsedAuctions);
    } catch (error) {
      let errorMessage: string = "Failed to find auction data";
      if (error instanceof Error) errorMessage = error.message;

      res.status(401).send(errorMessage);
    }
  }
);

router.post(
  "/api/getall/auctions/room",
  async (req: Request, res: Response) => {
    try {
      const auctions = await Auction.where("room")
        .equals(req.body.id)
        .select([
          "title",
          "description",
          "basePrice",
          "seller",
          "tags",
          "currentBid",
        ])
        .limit(20)
        .populate("seller", ["username"])
        .populate("currentBid", ["value"]);
      const parsedAuctions = auctions.map((data) => parseAuction(data));
      res.status(200).send(parsedAuctions);
    } catch (error) {
      let errorMessage: string = "Failed to find auction data ";
      if (error instanceof Error) {
        errorMessage = error.message;
        if (error.name === "CastError") return res.status(404).send("wrong ID");
      }
      res.status(401).send(errorMessage);
    }
  }
);

router.post(
  "/api/getone/auction",
  softAucthenticateToken,
  async (req: Request, res: Response) => {
    try {
      const data = await Auction.findById(req.body.id)
        .populate("seller", ["username", "email"])
        .populate({
          path: "currentBid",
          select: ["value", "bidder"],
          populate: { path: "bidder", select: ["username"] },
        });
      if (data == null) return res.status(401).send("no auction found");

      let isAllowed: boolean;
      if (req.user === undefined) isAllowed = false;
      else if (data.room == null) {
        isAllowed = true;
      } else {
        const room = await Room.findById(data.room);
        if (room === null) isAllowed = true;
        else {
          const admins: any = room.admins;
          const members: any = room.members;
          if (room.creator === req.user._id) isAllowed = true;
          else if (admins.indexOf(req.user._id) !== -1) isAllowed = true;
          else if (members.indexOf(req.user._id) !== -1) isAllowed = true;
          else isAllowed = false;
        }
      }
      res.send({
        data: parseAuction(data),
        isAuthenticated: !(req.user === undefined),
        isAllowed: isAllowed,
      });
    } catch (error) {
      let errorMessage: string = "Failed to find auction data ";
      if (error instanceof Error) {
        errorMessage = error.message;
        if (error.name === "CastError") return res.status(404).send("wrong ID");
      }
      res.status(401).send(errorMessage);
    }
  }
);

router.post(
  "/api/makeone/auction",
  authenticateToken,
  async (req: Request, res: Response) => {
    if (req.user === undefined) return res.status(404).send("no user found");

    let newID;
    try {
      if (req.body.room !== null) {
        let mailList = [];
        // if auction is private
        const findRoom = await Room.findOne({ name: req.body.room })
          .populate("creator", "email")
          .populate("admins", "email")
          .populate("members", "email");
        if (findRoom === null) return res.status(404).send("room not found");

        const newAuction = new Auction({
          ...req.body,
          seller: req.user._id,
          isPrivate: true,
          room: findRoom._id,
        });

        findRoom.auctionCount = parseInt(String(findRoom.auctionCount)) + 1;
        const saveRoom = await findRoom.save();
        const savedAuction = await newAuction.save();

        const creator: any = findRoom.creator;
        mailList.push(String(creator.email));
        const admins: any = findRoom.admins;
        admins.forEach((element: { email: string }) => {
          mailList.push(element.email);
        });
        const members: any = findRoom.members;
        members.forEach((element: { email: string }) => {
          mailList.push(element.email);
        });

        sendAuctionNoticeMail(
          mailList,
          String(savedAuction._id),
          String(findRoom.name),
          String(savedAuction.title)
        );
        newID = savedAuction._id;
      } else {
        // if auction is public
        const newAuction = new Auction({
          ...req.body,
          seller: req.user._id,
          isPrivate: false,
        });
        const savedAuction = await newAuction.save();
        newID = savedAuction._id;
      }

      res.status(201).send({
        msg: "Sucessfully created auction. Redirecting shortly...",
        id: newID,
      });
    } catch (error) {
      let errorMessage: string = "Failed to create auction";
      if (error instanceof Error) {
        errorMessage = error.message;
        if (error.name === "CastError")
          errorMessage = "Bad Request. Cast error occurred";
      }
      res.status(401).send(errorMessage);
    }
  }
);

router.post(
  "/api/upload",
  upload.array("images", 5),
  uploadToCloudinary,
  async (req: Request, res: Response) => {
    try {
      const cloudinaryUrls = req.body.cloudinaryUrls;
      if (cloudinaryUrls.length === 0) {
        console.error("No Cloudinary URLs found.");
        return res.status(500).send("Internal Server Error");
      }
      const images = cloudinaryUrls;
      return res.send(images);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
);

async function sendAuctionNoticeMail(
  mailList: string[],
  id: string,
  roomName: string,
  auctionName: string
) {
  const from: string = String(process.env.MAIL_USERNAME);
  const subject: string = `New Acution in ${roomName} `;

  const auctionLink: string = `http://127.0.0.1:5173/auctions/${id}`;
  const mailTemplate: string = `<p>
There has been a new auction for ${auctionName}<br/>
Click below to view<br/>
${auctionLink}<br/>
If you have problems, please paste the above URL into your web browser.<br/>
</p>`;

  mailList.forEach(async (mail) => {
    const to: string = mail;
    const mailResponse = await sendMail(from, to, subject, mailTemplate);
  });
}

export default router;
