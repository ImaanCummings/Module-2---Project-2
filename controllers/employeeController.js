import { pool } from "../db.js";



export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        employee_id,
        name,
        position,
        department,
        salary,
        employment_history,
        contact
      FROM employees
      ORDER BY employee_id ASC
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Get employees error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      position,
      department,
      salary,
      employment_history,
      contact,
    } = req.body;

    const errors = [];
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.push("'name' is required and must be a non-empty string.");
    }
    if (!position || typeof position !== "string" || !position.trim()) {
      errors.push("'position' is required and must be a non-empty string.");
    }
    if (!department || typeof department !== "string" || !department.trim()) {
      errors.push("'department' is required and must be a non-empty string.");
    }
    if (salary === undefined || salary === null || isNaN(Number(salary))) {
      errors.push("'salary' is required and must be a number.");
    }
    if (!employment_history || typeof employment_history !== "string" || !employment_history.trim()) {
      errors.push("'employment_history' is required and must be a non-empty string.");
    }
    if (!contact || typeof contact !== "string" || !contact.trim()) {
      errors.push("'contact' is required and must be a non-empty string.");
    }

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const [result] = await pool.query(
      `
      INSERT INTO employees (name, position, department, salary, employment_history, contact)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        name.trim(),
        position.trim(),
        department.trim(),
        Number(salary),
        employment_history.trim(),
        contact.trim(),
      ]
    );

    res.status(201).json({ message: "Employee added", employee_id: result.insertId });
  } catch (error) {
    console.error("Add employee error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
