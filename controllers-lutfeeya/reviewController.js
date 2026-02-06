import db from "../../db.js";

// Post Review

//This function saves a new employee review into the database.
export const postReview = async (req, res) => {
    try {
        //Get review data from request body
        const { employee_id, name, review } = req.body;

        // Basic validation
        const errors = [];
        if (employee_id === undefined || employee_id === null || isNaN(Number(employee_id))) {
            errors.push("'employee_id' is required and must be a number.");
        }
        if (!name || typeof name !== "string" || !name.trim()) {
            errors.push("'name' is required and must be a non-empty string.");
        }
        if (!review || typeof review !== "string" || !review.trim()) {
            errors.push("'review' is required and must be a non-empty string.");
        } else if (review.length > 1000) {
            errors.push("'review' must not exceed 1000 characters.");
        }

        if (errors.length) {
            return res.status(400).json({ errors });
        }

        // Clean and prepare data for insertion
        const empId = Number(employee_id);   // Convert employee_id to a number
        const cleanName = name.trim();       // Remove extra whitespace from name
        const cleanReview = review.trim();   // Remove extra whitespace from review


        // Insert the review into the database
        //The query uses parameterized statements to prevent SQL injection and ensure data integrity.
        await db.query(
            `
            INSERT INTO reviews (employee_id, name, review)
            VALUES (?, ?, ?)
            `,
            [empId, cleanName, cleanReview]
        );

        //Send success response
        res.status(201).json({ message: "Review recorded successfully" });
    } catch (error) {
        //Log error and send failure response
        console.error("Error recording review:", error);
        //Send an error message to the client
        res.status(500).json({ error: "Failed to record review" });
    }
}
//Post Review


//Get Review

// This function retrieves all employee reviews from the database.
export const getReviews = async (req, res) => {
    try {       
        const [rows] = await db.query(
            `
            SELECT 
                employee_id AS id,      
                name,
                review
            FROM reviews
            `       
        );          
        
        // Send the retrieved data as a JSON response with a 200 status code indicating success
        res.status(200).json(rows);

    }       
    catch (error) {     
        // Handle error and send failure response

        console.error("Error fetching reviews:", error);            

        // Send an error message to the client
        res.status(500).json({ error: "Failed to fetch reviews" });         

    }           
};
//Get Review