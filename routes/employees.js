import express from "express";
import { getEmployees, addEmployee } from "../controllers/employeeController.js";

const router = express.Router();

// GET all employees
router.get("/", getEmployees);

// ADD a new employee
router.post("/", addEmployee);

export default router;
