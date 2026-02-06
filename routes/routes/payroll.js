import express from "express";
import db from "../db.js"; // (database connection)
import { getPayroll, addPayroll } from "../controllers/payrollController.js";

const router = express.Router();

router.get("/", getPayroll);
router.get("/", addPayroll);

// GET payroll for a specific employee (using id)
router.get("/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;

    const [rows] = await db.query(
      "SELECT name, position, salary FROM employees WHERE id = ?",
      [employeeId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const employee = rows[0];

    // returns salary
    const payroll = {
      name: employee.name,
      position: employee.position,
      grossSalary: employee.salary,
      netSalary: employee.salary 
    };

    res.json(payroll);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch payroll" });
  }
});

export default router;

