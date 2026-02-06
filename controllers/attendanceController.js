import db from "../db.js";

// GET all attendance records
export const getAttendance = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        attendance_id AS id,
        emp_id AS employeeId,
        date,
        status
      FROM attendance
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Get attendance error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD attendance record
export const addAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    await db.query(
      `INSERT INTO attendance (emp_id, date, status)
       VALUES (?, ?, ?)`,
      [employeeId, date, status]
    );

    res.status(201).json({ message: "Attendance recorded" });
  } catch (error) {
    console.error("Add attendance error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
