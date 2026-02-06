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
  }
};
