import { Router } from "express";
import entryRouter from "./entry";
import auctionRouter from "./auctions";
import roomRouter from "./rooms";
import bidRouter from "./bids";
import commentRouter from "./comments";

const router: Router = Router();

//routes
router.use(entryRouter);
router.use(auctionRouter);
router.use(roomRouter);
router.use(bidRouter);
router.use(commentRouter);

export default router;
