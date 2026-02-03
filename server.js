// importing packages
import express from "express";
import cors from "cors";

// importing routes
import employeeRoutes from "./routes/employees.js";
import payrollRoutes from "./routes/payroll.js";
import attendanceRoutes from "./routes/attendance.js";
import reviewRoutes from "./routes/reviews.js";
import timeoffRoutes from "./routes/timeoff.js";   

// creating the express app
const app = express(); 

// middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use("/employees", employeeRoutes);
app.use("/payroll", payrollRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/reviews", reviewRoutes);
app.use("/timeoff", timeoffRoutes);

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
