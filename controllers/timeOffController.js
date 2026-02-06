import { pool } from "../db.js";

const isValidDate = (value) => {
  if (!value) return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
};

// POST leave request
export const addLeave = async (req, res) => {
  try {
    const { employee_id, name, date, reason, status } = req.body;

    const errors = [];
    if (name && (typeof name !== "string" || !name.trim())) {
      errors.push("'name' must be a non-empty string when provided.");
    }
    if (!isValidDate(date)) {
      errors.push("'date' is required and must be a valid date.");
    }
    if (!reason || typeof reason !== "string" || !reason.trim()) {
      errors.push("'reason' is required and must be a non-empty string.");
    }
    if (status && (typeof status !== "string" || !status.trim())) {
      errors.push("'status' must be a non-empty string when provided.");
    }
    if (employee_id !== undefined && employee_id !== null && isNaN(Number(employee_id))) {
      errors.push("'employee_id' must be a number when provided.");
    }

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const finalStatus = status?.trim() || "Pending";

    if (employee_id !== undefined && employee_id !== null) {
      await pool.query(
        `
        INSERT INTO \`leave\` (employee_id, name, date, reason, status)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          Number(employee_id),
          name?.trim() || "",
          date,
          reason.trim(),
          finalStatus,
        ]
      );
    } else {
      await pool.query(
        `
        INSERT INTO \`leave\` (name, date, reason, status)
        VALUES (?, ?, ?, ?)
        `,
        [name?.trim() || "", date, reason.trim(), finalStatus]
      );
    }

    res.status(201).json({ message: "Leave recorded successfully" });
  } catch (error) {
    console.error("Error recording leave:", error);
    res.status(500).json({ error: "Failed to record leave" });
  }
};

// GET leave requests
export const getLeaves = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        employee_id,
        name,
        date,
        reason,
        status
      FROM \`leave\`
      ORDER BY date DESC, employee_id DESC
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching leaves:", error);
    res.status(500).json({ error: "Failed to fetch leaves" });
  }
};

// PATCH leave status
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const leaveId = Number(id);

    if (Number.isNaN(leaveId)) {
      return res.status(400).json({ error: "id must be a number" });
    }
    if (!status || typeof status !== "string" || !status.trim()) {
      return res.status(400).json({ error: "'status' is required" });
    }

    const [result] = await pool.query(
      `
      UPDATE \`leave\`
      SET status = ?
      WHERE employee_id = ?
      `,
      [status.trim(), leaveId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Leave record not found" });
    }

    res.status(200).json({ message: "Leave status updated" });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ error: "Failed to update leave status" });
  }
};
