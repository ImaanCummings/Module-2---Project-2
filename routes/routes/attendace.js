import express from "express";
import { getAttendance, addAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

// GET all attendance records
router.get("/", getAttendance);

// ADD attendance record
router.post("/", addAttendance);

export default router;
