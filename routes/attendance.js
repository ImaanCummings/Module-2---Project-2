import express from "express";
import { getAttendance, addAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/", getAttendance);
=======
// GET all attendance records
router.get("/", getAttendance);

// ADD attendance record
>>>>>>> 94f23bdd2abf423178854bc78a1a2495fa4f9b54
router.post("/", addAttendance);

export default router;
