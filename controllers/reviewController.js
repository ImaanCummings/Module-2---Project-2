<<<<<<< HEAD
import { pool } from "../db.js";

export const addReview = async (req, res) => {
  try {
    const { employee_id, name, review } = req.body;

    const errors = [];
    if (employee_id === undefined || employee_id === null || isNaN(Number(employee_id))) {
      errors.push("'employee_id' is required and must be a number.");
    }
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.push("'name' is required and must be a non-empty string.");
    }
    if (!review || typeof review !== "string" || !review.trim()) {
      errors.push("'review' is required and must be a non-empty string.");
    } else if (review.length > 45) {
    }
    if (name && name.length > 45) {
    }

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const safeName = name.trim().slice(0, 45);
    const safeReview = review.trim().slice(0, 45);

    await pool.query(
      `
      INSERT INTO reviews (employee_id, name, review)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        review = VALUES(review)
      `,
      [Number(employee_id), safeName, safeReview]
    );

    res.status(201).json({ message: "Review recorded successfully" });
  } catch (error) {
    console.error("Error recording review:", error);
    res.status(500).json({ error: "Failed to record review", detail: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        employee_id,
        name,
        review
      FROM reviews
      ORDER BY employee_id ASC
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
=======
import db from "../db.js";

// GET all employee reviews
export const getReviews = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        review_id AS id,
        emp_id AS employeeId,
        reviewer_name AS reviewer,
        rating,
        comments
      FROM reviews
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD a review
export const addReview = async (req, res) => {
  try {
    const { employeeId, reviewer, rating, comments } = req.body;

    await db.query(
      `INSERT INTO reviews (emp_id, reviewer_name, rating, comments)
       VALUES (?, ?, ?, ?)`,
      [employeeId, reviewer, rating, comments]
    );

    res.status(201).json({ message: "Review added" });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ message: "Server error" });
>>>>>>> 94f23bdd2abf423178854bc78a1a2495fa4f9b54
  }
};
