import express from "express";
<<<<<<< HEAD
import { getPayroll, getPayrollByEmployee, addPayroll } from "../controllers/payrollController.js";

const router = express.Router();

// GET all payroll
router.get("/", getPayroll);

// GET payroll for a single employee by ID
router.get("/:employee_id", getPayrollByEmployee);

// POST payroll
router.post("/", addPayroll);
=======
import { getPayroll, addPayroll, getPayrollByEmployee } from "../controllers/payrollController.js";

const router = express.Router();

// GET all payroll records
router.get("/", getPayroll);

// ADD payroll record
router.post("/", addPayroll);

// GET payroll for a specific employee
router.get("/:employeeId", getPayrollByEmployee);
>>>>>>> 94f23bdd2abf423178854bc78a1a2495fa4f9b54

export default router;
