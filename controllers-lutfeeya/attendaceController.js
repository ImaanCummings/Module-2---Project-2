import db from "../db.js";

// POST attendance
export const addAttendance = async (req, res) => {
  try {
    const { employee_id, attendance_date, status } = req.body;

    await db.query(
      `
      INSERT INTO attendance (employee_id, attendance_date, status)
      VALUES (?, ?, ?)
      `,
      [employee_id, attendance_date, status]
    );

    res.status(201).json({ message: "Attendance recorded successfully" });
  } catch (error) {
    console.error("Error recording attendance:", error);
    res.status(500).json({ error: "Failed to record attendance" });
  }
};

// GET attendance
export const getAttendance = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        employee_id,
        attendance_date,
        status
      FROM attendance
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
};
