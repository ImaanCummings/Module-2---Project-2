// server.js
import express from "express";
import cors from "cors";

// Import route files
import employeeRoutes from "./routes/employees.js";
import payrollRoutes from "./routes/payroll.js";
import attendanceRoutes from "./routes/attendance.js";
import reviewRoutes from "./routes/reviews.js";
import timeOffRoutes from "./routes/timeOff.js";

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/employees", employeeRoutes);
app.use("/payroll", payrollRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/reviews", reviewRoutes);
app.use("/timeoff", timeOffRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the HR Management API!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
