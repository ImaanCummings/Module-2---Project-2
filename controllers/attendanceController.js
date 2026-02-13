import { pool } from "../db.js";

const isValidDate = (value) => {
  if (!value) return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
};

export const getAttendance = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        id,
        employee_id,
        attendance_date,
        status
      FROM attendance
      ORDER BY attendance_date DESC, id DESC
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
};

export const addAttendance = async (req, res) => {
  try {
    const { employee_id, attendance_date, status } = req.body;

    const errors = [];
    if (employee_id === undefined || employee_id === null || isNaN(Number(employee_id))) {
      errors.push("'employee_id' is required and must be a number.");
    }
    if (!isValidDate(attendance_date)) {
      errors.push("'attendance_date' is required and must be a valid date.");
    }
    if (!status || typeof status !== "string" || !status.trim()) {
      errors.push("'status' is required and must be a non-empty string.");
    }

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    await pool.query(
      `
      INSERT INTO attendance (employee_id, attendance_date, status)
      VALUES (?, ?, ?)
      `,
      [Number(employee_id), attendance_date, status.trim()]
    );

    res.status(201).json({ message: "Attendance recorded successfully" });
  } catch (error) {
    console.error("Error recording attendance:", error);
    res.status(500).json({ error: "Failed to record attendance" });
  }
};
