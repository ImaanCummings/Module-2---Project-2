import express from "express";
import { getReviews, addReview } from "../controllers/reviewController.js";

const router = express.Router();

// GET all reviews
router.get("/", getReviews);

// ADD a review
router.post("/", addReview);

export default router;
