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
  }
};
