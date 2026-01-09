import { Router } from "express";
import { getPollHistory } from "../controllers/pollController";

const router = Router();

router.get("/history", getPollHistory);

export default router;
