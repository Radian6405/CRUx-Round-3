import { Router, Request, Response } from "express"
import { User } from "../../mongoose/schemas/User"
import { hashPassword } from "../utils/helpers";

const router:Router = Router();

//login, logout and register


export default router;