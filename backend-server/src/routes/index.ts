import { Router } from "express";
import entryRouter from './entry'

const router:Router = Router();

//routes
router.use(entryRouter)

export default router