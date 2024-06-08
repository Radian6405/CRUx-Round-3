import { Router, Request, Response } from "express";
import { Bid } from "../../mongoose/schemas/Bid";
import { Auction } from "../../mongoose/schemas/Auction";
import { Decimal128, ObjectId } from "mongoose";
import { authenticateToken } from "../utils/authHelpers";
import { parseBid } from "../utils/helpers";

const router: Router = Router();

router.post(
  "/api/makeone/bid",
  authenticateToken,
  async (req: Request, res: Response) => {
    if (req.user === undefined) return res.status(404).send("no user found");

    try {
      const findAuction: any = await Auction.findById(
        req.body.auction
      ).populate("currentBid", "value");
      if (findAuction === null)
        return res.status(406).send("This auction does not exist");

      const startTime: number = new Date(findAuction.startDate).getTime();
      const currentTime: number = new Date().getTime();
      const endTime: number = new Date(findAuction.endDate).getTime();
      if (currentTime < startTime)
        return res.status(406).send("You cannot Bid. Auction has not started");
      if (endTime < currentTime)
        return res.status(406).send("You cannot Bid. Auction has ended");

      const currentValue =
        findAuction.currentBid === undefined
          ? findAuction.basePrice
          : findAuction.currentBid.value;
      if (req.body.value <= parseFloat(currentValue))
        return res
          .status(406)
          .send("New bid has to be geater than previous/start bid ");

      const newBid = new Bid({
        ...req.body,
        bidder: req.user._id,
      });
      const saveBid = await newBid.save();

      findAuction.currentBid = saveBid._id;
      const savedAuction = await findAuction.save();

      res
        .status(201)
        .send(`You have bid for $${req.body.value} in ${findAuction.title}`);
    } catch (error) {
      let errorMessage: string = "Failed to create room";
      if (error instanceof Error) {
        if (error.name === "CastError")
          errorMessage = "Cannot find auction. " + error.name;
        else errorMessage = error.message;
      }
      res.status(401).send(errorMessage);
    }
  }
);

router.post("/api/getall/bids", async (req: Request, res: Response) => {
  try {
    const findAuction = await Auction.findById(req.body.id);
    if (!findAuction)
      return res.status(404).send("couldnt find the given option");

    const findBids = await Bid.where("auction")
      .equals(req.body.id)
      .select(["value", "bidder"])
      .populate("bidder", ["username"]);

    const parsedBids = findBids.map((bid) => parseBid(bid));
    res.status(200).send(parsedBids);
  } catch (error) {
    let errorMessage: string = "Failed to find bids";
    if (error instanceof Error) {
      if (error.name === "CastError")
        errorMessage = "Cannot find auction. " + error.name;
      else errorMessage = error.message;
    }
    res.status(401).send(errorMessage);
  }
});
export default router;
