import express from "express";
import { getLeaves, addLeave, updateLeaveStatus } from "../controllers/timeOffController.js";

const router = express.Router();

router.get("/", getLeaves);
router.post("/", addLeave);
router.patch("/:id", updateLeaveStatus);

export default router;
