import { Router, Request, Response } from "express";
import { Auction } from "../../mongoose/schemas/Auction";
import { Comment } from "../../mongoose/schemas/Comment";
import { authenticateToken } from "../utils/authHelpers";

const router: Router = Router();

router.post(
  "/api/makeone/comment",
  authenticateToken,
  async (req: Request, res: Response) => {
    if (req.user === undefined) return res.status(404).send("no user found");

    try {
      const findAuction: any = await Auction.findById(req.body.auction);
      if (findAuction === null)
        return res.status(406).send("This auction does not exist");
      if (String(findAuction.seller) === req.user._id)
        return res.status(406).send("Cannot comment on your own auctions");
      if (req.body.text === "")
        return res.status(406).send("Cannot comment an empty comment");

      const startTime: number = new Date(findAuction.startDate).getTime();
      const currentTime: number = new Date().getTime();
      const endTime: number = new Date(findAuction.endDate).getTime();
      if (currentTime < startTime)
        return res
          .status(406)
          .send("You cannot comment. Auction has not started");
      if (endTime < currentTime)
        return res.status(406).send("You cannot comment. Auction has ended");

      const newComment = new Comment({
        ...req.body,
        user: req.user._id,
      });
      const saveComment = await newComment.save();

      res.status(201).send(`commented`);
    } catch (error) {
      let errorMessage: string = "Failed to create a comment";
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
