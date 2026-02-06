import express from "express";
import { getPayroll, getPayrollByEmployee, addPayroll } from "../controllers/payrollController.js";

const router = express.Router();

// GET all payroll
router.get("/", getPayroll);

// GET payroll for a single employee by ID
router.get("/:employee_id", getPayrollByEmployee);

// POST payroll
router.post("/", addPayroll);

export default router;
