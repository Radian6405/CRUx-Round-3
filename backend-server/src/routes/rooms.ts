import { Router, Request, Response } from "express";
import { Room } from "../../mongoose/schemas/Room";
import { User } from "../../mongoose/schemas/User";
import { authenticateToken } from "../utils/authHelpers";

const router: Router = Router();

router.get(
  "/api/getall/rooms",
  authenticateToken,
  async (req: Request, res: Response) => {
    if (!req.user) return res.status(400).send("no user found");

    const findUser = await User.findOne({
      username: String(req.user.username),
    });
    const userID = findUser !== null ? findUser._id : "1";

    const rooms = await Room.find({
      $or: [{ members: userID }, { admins: userID }, { creator: userID }],
    })
      .select(["name", "description", "auctionCount", "creator"])
      .populate("creator", "username");

    res.send(rooms);
  }
);

export default router;
