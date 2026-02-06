import db from "../db.js";

// GET all time-off requests
export const getTimeOff = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        timeoff_id AS id,
        emp_id AS employeeId,
        start_date,
        end_date,
        reason,
        status
      FROM time_off
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Get time off error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD a time-off request
export const addTimeOff = async (req, res) => {
  try {
    const { employeeId, start_date, end_date, reason } = req.body;

    await db.query(
      `INSERT INTO time_off (emp_id, start_date, end_date, reason)
       VALUES (?, ?, ?, ?)`,
      [employeeId, start_date, end_date, reason]
    );

    res.status(201).json({ message: "Time off requested" });
  } catch (error) {
    console.error("Add time off error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
