import { Router } from "express";
import entryRouter from "./entry";
import auctionRouter from "./auctions";

const router: Router = Router();

//routes
router.use(entryRouter);
router.use(auctionRouter);

export default router;
