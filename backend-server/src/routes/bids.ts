import { Router, Request, Response } from "express";
import { Bid } from "../../mongoose/schemas/Bid";
import { Auction } from "../../mongoose/schemas/Auction";
import { Decimal128, ObjectId } from "mongoose";
import { authenticateToken } from "../utils/authHelpers";

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
export default router;
