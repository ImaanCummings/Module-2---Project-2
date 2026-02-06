import express from "express";
import { getTimeOff, addTimeOff } from "../controllers/timeOffController.js";

const router = express.Router();

router.get("/", getTimeOff);
router.post("/", addTimeOff);

export default router;
