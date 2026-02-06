import express from "express";
import { getPayroll, addPayroll, getPayrollByEmployee } from "../controllers/payrollController.js";

const router = express.Router();

// GET all payroll records
router.get("/", getPayroll);

// ADD payroll record
router.post("/", addPayroll);

// GET payroll for a specific employee
router.get("/:employeeId", getPayrollByEmployee);

export default router;
