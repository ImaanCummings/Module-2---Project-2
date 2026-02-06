import express from "express";
import { getReviews, addReview } from "../controllers/reviewController.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/", getReviews);
=======
// GET all reviews
router.get("/", getReviews);

// ADD a review
>>>>>>> 94f23bdd2abf423178854bc78a1a2495fa4f9b54
router.post("/", addReview);

export default router;
