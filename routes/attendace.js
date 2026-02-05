// routes/attendance.js
import express from "express";
import { getAttendance, addAttendance } from "../controllers/attendanceController.js";


const router = express.Router();

router.get("/", getAttendance);
router.post("/", addAttendance);

// placeholder route
router.get("/", (req, res) => {
  res.json({ message: "Attendance routes not implemented yet" });
});

export default router;
