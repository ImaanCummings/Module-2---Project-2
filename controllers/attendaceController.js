import db from "../db.js";

// Post Attendance
//This function records a new attendance entry into the database.
export const postAttendance = async (req, res) => {
    try { 
        //Extract attendance data from request body
        const { employee_id, name, date, status } = req.body;

        //Insert the attendance data into the database
        //The query uses parameterized statements to prevent SQL injection and ensure data integrity.
        //? placeholders safely insert user data and prevent SQL injection attacks by treating the input as data rather than executable code.
        await db.query(
            `
            INSERT INTO moderntech_solutions_database_attendance (employee_id, name, date, status)
            VALUES (?, ?, ?, ?)
            `,
            [employee_id, name, date, status]
        );

        //Send success response to the client
        res.status(201).json({ message: "Attendance recorded successfully" });
    } catch (error) {
        //Log error and send failure response
        console.error("Error recording attendance:", error);

        //Send an error message to the client
        res.status(500).json({ error: "Failed to record attendance" });
    }
};

// Get Attendance

//This function retrieves all attendance records from the database and sends them back to the client.
//It should run when someone sends a Get request to attendance.
export const getAttendance = async (req, res) => {
    try {       
        //Query the retrieved data from the database
        const [rows] = await db.query(
            `
            SELECT 
                employee_id AS id,  
                name,
                date,
                status
            FROM moderntech_solutions_database_attendance
            `       
        );

        //Send the retrieved data as a JSON response with a 200 status code indicating success
        res.status(200).json(rows);
    } catch (error) {
        //Log error and send failure response
        console.error("Error fetching attendance:", error);

        //Send an error message to the client
        res.status(500).json({ error: "Failed to fetch attendance" });
    }
};
//Get Attendance








