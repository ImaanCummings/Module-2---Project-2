import db from "../db.js";

//Post Payroll

//This function records a new payroll entry into the database.
export const postPayroll = async (req, res) => {
    try {
        //Extract payroll data from request body
        const { id, employee_id, hours_worked, leave_deductions, final_salary } = req.body;
        
        //Insert the payroll data into the database
        //The query uses parameterized statements to prevent SQL injection and ensure data integrity.
        await db.query(
            `
            INSERT INTO moderntech_solutions_database_payroll (id, employee_id, hours_worked, leave_deductions, final_salary)
            VALUES (?, ?, ?, ?, ?)
            `,
            [id, employee_id, hours_worked, leave_deductions, final_salary]
        );

        //Send success response to the client
        res.status(201).json({ message: "Payroll recorded successfully" });

    } catch (error) {
        //Log error and send failure response
        console.error("Error recording payroll:", error);

        //Send an error message to the client
        res.status(500).json({ error: "Failed to record payroll" });
    }
}
//Post Payroll

//Get Payroll
//This function retrieves all payroll records from the database.
export const getPayrolls = async (req, res) => {
    try {
        //Query the database for all payroll records
        const [rows] = await db.query(
            `
            SELECT 
                id,     
                employee_id,
                hours_worked,
                leave_deductions,
                final_salary
            FROM moderntech_solutions_database_payroll
            `
        );

        //Send the retrieved data as a JSON response with a 200 status code indicating success
        res.status(200).json(rows);

    } catch (error) {   
        //Log error and send failure response
        console.error("Error fetching payrolls:", error);

        //Send an error message to the client
        res.status(500).json({ error: "Failed to fetch payrolls" });
    }   
};
//Get Payroll
