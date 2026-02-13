import express from "express";
import { getPayroll, getPayrollByEmployee, addPayroll } from "../controllers/payrollController.js";

const router = express.Router();

router.get("/", getPayroll);
router.get("/:employee_id", getPayrollByEmployee);
router.post("/", addPayroll);

export default router;
