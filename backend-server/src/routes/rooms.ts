import { Router, Request, Response } from "express";
import { Room } from "../../mongoose/schemas/Room";
import { User } from "../../mongoose/schemas/User";
import { authenticateToken } from "../utils/authHelpers";

const router: Router = Router();

router.get(
  "/api/getall/rooms",
  authenticateToken,
  async (req: Request, res: Response) => {
    if (!req.user) return res.status(404).send("no user found");

    try {
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
    } catch (error) {
      let errorMessage: string = "Failed to find room data";
      if (error instanceof Error) errorMessage = error.message;

      res.status(401).send(errorMessage);
    }
  }
);

router.post("/api/getone/room", async (req: Request, res: Response) => {
  try {
    const data = await Room.findById(req.body.id)
      .populate("creator", "username")
      .populate("admins", "username")
      .populate("members", "username");

    res.send(data);
  } catch (error) {
    let errorMessage: string = "Failed to find room data ";
    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.name === "CastError") return res.status(404).send("wrong ID");
    }
    res.status(401).send(errorMessage);
  }
});

export default router;
