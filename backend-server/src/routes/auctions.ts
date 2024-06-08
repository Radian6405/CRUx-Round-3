import { Router, Request, Response } from "express";
import { Auction } from "../../mongoose/schemas/Auction";
import { Room } from "../../mongoose/schemas/Room";
import { parseAuction } from "../utils/helpers";
import { ObjectId } from "mongoose";
import { authenticateToken } from "../utils/authHelpers";

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
      const parsedAuctions = auctions.map((data) => {
        return parseAuction(data);
      });
      res.send(parsedAuctions);
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

router.post("/api/getone/auction", async (req: Request, res: Response) => {
  try {
    const data = await Auction.findById(req.body.id)
      .populate("seller", ["username", "email"])
      .populate({
        path: "currentBid",
        select: ["value", "bidder"],
        populate: { path: "bidder", select: ["username"] },
      });

    res.send(parseAuction(data));
  } catch (error) {
    let errorMessage: string = "Failed to find auction data ";
    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.name === "CastError") return res.status(404).send("wrong ID");
    }
    res.status(401).send(errorMessage);
  }
});

router.post(
  "/api/makeone/auction",
  authenticateToken,
  async (req: Request, res: Response) => {
    if (req.user === undefined) return res.status(404).send("no user found");

    try {
      if (req.body.rooms !== undefined && req.body.rooms.length !== 0) {
        // if auction is private
        const findRooms = await Room.find({
          name: { $in: req.body.rooms },
        }).select("_id");
        const roomIDs: string[] = findRooms.map((room) => String(room._id));

        roomIDs.map(async (roomID) => {
          if (req.user === undefined)
            return res.status(404).send("no user found");

          const newAuction = new Auction({
            ...req.body,
            seller: req.user._id,
            isPrivate: true,
            room: roomID,
          });
          const savedAuction = await newAuction.save();
        });
      } else {
        // if auction is public
        const newAuction = new Auction({
          ...req.body,
          seller: req.user._id,
          isPrivate: false,
        });
        const savedAuction = await newAuction.save();
      }
      res.status(201).send("Sucessfully created auction(s)");
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

export default router;
