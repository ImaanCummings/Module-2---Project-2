import express from "express";
import db from "../db.js"; // (connects the database)
import { getEmployees, addEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", addEmployee);



// Get all employees
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch employees" });
  }
});


// Add a new employee
router.post("/", async (req, res) => {
  try {
    const { name, position, salary } = req.body;

    if (!name || !position || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [result] = await db.query(
      "INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)",
      [name, position, salary]
    );

    res.status(201).json({ 
      message: "Employee added successfully", 
      employeeId: result.insertId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to add employee" });
  }
});

export default router;