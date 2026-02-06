import db from "../db.js";

// GET all employees
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        emp_id AS id,
        first_name AS name,
        job_title AS position,
        salary_amount AS salary
      FROM employees_table_name_here
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Get employees error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD employee
export const addEmployee = async (req, res) => {
  try {
    const { name, position, salary } = req.body;

    await db.query(
      `
      INSERT INTO employees_table_name_here 
      (first_name, job_title, salary_amount)
      VALUES (?, ?, ?)
      `,
      [name, position, salary]
    );

    res.status(201).json({ message: "Employee added" });
  } catch (error) {
    console.error("Add employee error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
