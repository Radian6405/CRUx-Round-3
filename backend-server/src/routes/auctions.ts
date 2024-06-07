//@ts-nocheck
import { Router, Request, Response } from "express";
import { Auction } from "../../mongoose/schemas/Auction";
import { parseAuction } from "../utils/helpers";

const router: Router = Router();

router.get(
  "/api/getall/auctions/public",
  async (req: Request, res: Response) => {
    const auctions = await Auction.find({ isPrivate: false }, [
      "title",
      "description",
      "basePrice",
      "seller",
      "tags",
    ])
      .limit(20)
      .populate("seller", ["username"]);

    const parsedAuctions = auctions.map((data) => {
      return parseAuction(data);
    });
    res.send(parsedAuctions);
  }
);

router.post("/api/data/auction", async (req: Request, res: Response) => {
  const data = await Auction.findById(req.body.id);

  res.send(parseAuction(data));
});

export default router;
