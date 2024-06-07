//@ts-nocheck
import { Router, Request, Response } from "express";
import { Auction } from "../../mongoose/schemas/Auction";
import { parseAuction } from "../utils/helpers";

const router: Router = Router();

router.get(
  "/api/getall/auctions/public",
  async (req: Request, res: Response) => {
    const auctions = await Auction.where("isPrivate")
      .equals(false)
      .select(["title", "description", "basePrice", "seller", "tags"])
      .limit(20)
      .populate("seller", ["username"]);

    const parsedAuctions = auctions.map((data) => {
      return parseAuction(data);
    });
    res.send(parsedAuctions);
  }
);

router.post(
  "/api/getall/auctions/room",
  async (req: Request, res: Response) => {
    const auctions = await Auction.where("room")
      .equals(req.body.id)
      .select(["title", "description", "basePrice", "seller", "tags"])
      .limit(20)
      .populate("seller", ["username"]);

    const parsedAuctions = auctions.map((data) => {
      return parseAuction(data);
    });
    res.send(parsedAuctions);
  }
);

router.post("/api/getone/auction", async (req: Request, res: Response) => {
  const data = await Auction.findById(req.body.id).populate("seller", [
    "username",
    "email",
  ]);

  res.send(parseAuction(data));
});

export default router;
