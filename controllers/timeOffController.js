import db from "../db.js";

// Post Leave

//This function handles the addition of a new leave record to the database.
//It should run when someone sends a Post request to leave.

export const postLeave = async (req, res) => {
    try { 
        const { employee_id, name, date, reason, status } = req.body;

        await db.query(
            `
            INSERT INTO moderntech_solutions_database_attendance (employee_id, name, date, reason, status)
            VALUES (?, ?, ?, ?, ?)
            `,
            [employee_id, name, date, reason, status]
        );
        //Send success response
        res.status(201).json({ message: "Leave recorded successfully" });
    
    } catch (error) {
        //Log error and send failure response
        console.error("Error recording leave:", error);
        //This status code indicates a server error, and the message provides feedback to the client.
        res.status(500).json({ error: "Failed to record leave" });
    }
};
//Post Leave

//Get Leave

//This function retrieves all leave records from the database and sends them back to the client.
//It should run when someone sends a Get request to leave.
export const getLeaves = async (req, res) => {
    try {
        //Query the retrieved data from the database
        const [rows] = await db.query(
            `
            SELECT 
                employee_id AS id,
                name,
                date,
                reason,
                status
            FROM moderntech_solutions_database_attendance
            `       
        );
        //Send the retrieved data as a JSON response with a 200 status code indicating success
        res.status(200).json(rows);

    } catch (error) {
        //Log error and send failure response
        console.error("Error fetching leaves:", error);

        //Send an error message to the client
        res.status(500).json({ error: "Failed to fetch leaves" });
    }
};
//Get Leave 