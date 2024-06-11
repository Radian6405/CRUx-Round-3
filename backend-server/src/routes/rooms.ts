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
      const rooms = await Room.find({
        $or: [
          { members: req.user._id },
          { admins: req.user._id },
          { creator: req.user._id },
        ],
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

router.post(
  "/api/getone/room",
  authenticateToken,
  async (req: Request, res: Response) => {
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
  }
);

router.post(
  "/api/makeone/room",
  authenticateToken,
  async (req: Request, res: Response) => {
    if (req.user === undefined) return res.status(404).send("no user found");

    let hasError: Boolean = false;
    let responsMsg: string = "Room created sucessfully";

    try {
      const adminIDs: string[] = [];
      for (let i = 0; i < req.body.admins.length; i++) {
        const findAdmin = await User.findOne({ username: req.body.admins[i] });
        if (findAdmin === null) {
          hasError = true;
          responsMsg = `User "${req.body.admins[i]}" not found`;
          break;
        }

        //ignoring creator from admin list
        if (String(findAdmin._id) === req.user._id) continue;

        adminIDs.push(String(findAdmin._id));
      }
      if (hasError) return res.status(404).send(responsMsg);

      const memberIDs: string[] = [];
      for (let i = 0; i < req.body.members.length; i++) {
        const findMember = await User.findOne({
          username: req.body.members[i],
        });
        if (findMember === null) {
          hasError = true;
          responsMsg = `User "${req.body.members[i]}" not found`;
          break;
        }

        //ignoring admins and creator from member list
        if (
          adminIDs.indexOf(String(findMember._id)) > -1 ||
          String(findMember._id) === req.user._id
        )
          continue;

        memberIDs.push(String(findMember._id));
      }
      if (hasError) return res.status(404).send(responsMsg);

      const newRoom = new Room({
        ...req.body,
        creator: req.user._id,
        admins: adminIDs,
        members: memberIDs,
      });
      const saveRoom = await newRoom.save();

      res.status(201).send(responsMsg);
    } catch (error) {
      let errorMessage: string = "Failed to create room";
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
