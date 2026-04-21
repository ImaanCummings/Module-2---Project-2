import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import employeeRoutes from "./routes/employees.js";
import payrollRoutes from "./routes/payroll.js";
import attendanceRoutes from "./routes/attendance.js";
import reviewRoutes from "./routes/reviews.js";
import timeOffRoutes from "./routes/timeOff.js";
import leaveRoutes from "./routes/leave.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/test-db", async (req, res) => {
  try {
    const [results] = await pool.query("SHOW TABLES");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/employees", employeeRoutes);
app.use("/payroll", payrollRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/reviews", reviewRoutes);
app.use("/timeoff", timeOffRoutes);
app.use("/leave", leaveRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the HR Management API!");
});

const PORT = 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
