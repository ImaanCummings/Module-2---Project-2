<<<<<<< HEAD
import { pool } from "../db.js";

export const getPayroll = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        id,
        employee_id,
        hours_worked,
        leave_deductions,
        final_salary
      FROM payroll
      ORDER BY id DESC
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching payrolls:", error);
    res.status(500).json({ error: "Failed to fetch payrolls" });
  }
};

export const getPayrollByEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const empId = Number(employee_id);

    if (Number.isNaN(empId)) {
      return res.status(400).json({ error: "employee_id must be a number" });
    }

    const [rows] = await pool.query(
      `
      SELECT
        id,
        employee_id,
        hours_worked,
        leave_deductions,
        final_salary
      FROM payroll
      WHERE employee_id = ?
      ORDER BY id DESC
      `,
      [empId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching payroll by employee:", error);
    res.status(500).json({ error: "Failed to fetch payrolls" });
  }
};

export const addPayroll = async (req, res) => {
  try {
    const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;

    const errors = [];
    if (employee_id === undefined || employee_id === null || isNaN(Number(employee_id))) {
      errors.push("'employee_id' is required and must be a number.");
    }
    if (hours_worked === undefined || hours_worked === null || isNaN(Number(hours_worked))) {
      errors.push("'hours_worked' is required and must be a number.");
    }
    if (leave_deductions === undefined || leave_deductions === null || isNaN(Number(leave_deductions))) {
      errors.push("'leave_deductions' is required and must be a number.");
    }
    if (final_salary === undefined || final_salary === null || isNaN(Number(final_salary))) {
      errors.push("'final_salary' is required and must be a number.");
    }

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    await pool.query(
      `
      INSERT INTO payroll (employee_id, hours_worked, leave_deductions, final_salary)
      VALUES (?, ?, ?, ?)
      `,
      [
        Number(employee_id),
        Number(hours_worked),
        Number(leave_deductions),
        Number(final_salary),
      ]
    );

    res.status(201).json({ message: "Payroll recorded successfully" });
  } catch (error) {
    console.error("Error recording payroll:", error);
    res.status(500).json({ error: "Failed to record payroll" });
=======
import db from "../db.js";

// GET all payroll records
export const getPayroll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        payroll_id AS id,
        emp_id AS employeeId,
        amount,
        pay_date AS date
      FROM payroll
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Get payroll error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET payroll by employee
export const getPayrollByEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const [rows] = await db.query(`
      SELECT
        payroll_id AS id,
        emp_id AS employeeId,
        amount,
        pay_date AS date
      FROM payroll
      WHERE emp_id = ?
    `, [employee_id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Get payroll by employee error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD payroll record
export const addPayroll = async (req, res) => {
  try {
    const { employeeId, amount, date } = req.body;
    await db.query(
      `INSERT INTO payroll (emp_id, amount, pay_date)
       VALUES (?, ?, ?)`,
      [employeeId, amount, date]
    );
    res.status(201).json({ message: "Payroll added" });
  } catch (error) {
    console.error("Add payroll error:", error);
    res.status(500).json({ message: "Server error" });
>>>>>>> 94f23bdd2abf423178854bc78a1a2495fa4f9b54
  }
};
